import { Ticket, TicketFieldsType } from "../models/ticket.model.ts";
import sequelize from "../database.ts";
import dotenv from "dotenv";
import { Op } from "@sequelize/core";
import { Request, Response } from "express";
import { WhereAttributeHash } from "@sequelize/core/_non-semver-use-at-your-own-risk_/abstract-dialect/where-sql-builder-types.js";

dotenv.config({ path: "../.env.local" });

interface LoginRequestParams {
  email: string;
  password: string;
}

interface TicketFilter {
  // display
  layout: string;
  grouping: string;

  // filters
  termStart?: string;
  termEnd?: string;
  building?: string[];
  room?: string;
  requestor?: string[];
  titleSubstring?: string;
  diagnoses?: string[];
  matchAllDiagnoses?: boolean;
}

function ValidateTicketFilter(filter: TicketFilter) {}

function TicketFieldsAsFilter(
  filter: TicketFilter,
): WhereAttributeHash<TicketFieldsType> {
  const formattedFilter: WhereAttributeHash = {};

  if (filter.termStart) {
    formattedFilter["termStart"] = { [Op.gte]: filter.termStart };
  }
  if (filter.termEnd) {
    formattedFilter["termEnd"] = { [Op.lte]: filter.termEnd };
  }
  if (filter.building) {
    formattedFilter["location"] = { [Op.in]: filter.building };
  }
  if (filter.room) {
    formattedFilter["room"] = { [Op.eq]: filter.room };
  }
  if (filter.requestor) {
    formattedFilter["requestor"] = { [Op.in]: filter.requestor };
  }
  if (filter.titleSubstring) {
    formattedFilter["title"] = {
      [Op.like]: `%${filter.titleSubstring}%`,
    };
  }
  if (filter.diagnoses) {
    if (filter.matchAllDiagnoses) {
      // Use AND logic for matching all diagnoses
      formattedFilter["diagnoses"] = {
        [Op.and]: filter.diagnoses.map((diag) => ({ [Op.eq]: diag })),
      };
    } else {
      // Use OR logic for matching any diagnosis
      formattedFilter["diagnoses"] = {
        [Op.or]: filter.diagnoses.map((diag) => ({ [Op.eq]: diag })),
      };
    }
  }

  console.log(formattedFilter);
  return formattedFilter;
}

/*
 * Fetches the administrator JWT bearer-token for making TDX Web API calls
 */
async function _fetchAdminApiToken() {
  // mode: TDWebApi | SBTDWebApi
  const apiMode = process.env.API_ENVIRONMENT_MODE;
  let api_url = `https://service.uoregon.edu/${apiMode}/api/auth`;
  if (apiMode !== "TDWebApi" && apiMode !== "SBTDWebApi") {
    console.log("Undefined API mode. Use 'SBTDWebApi' or 'TDWebApi'");
    return { error: "Undefined API mode." };
  }

  const credentials_body = JSON.stringify({
    username: process.env.TDX_USERNAME,
    password: process.env.TDX_PASSWORD,
  });

  // send post request to tdx api to recieve bearer token
  return fetch(api_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: credentials_body,
  })
    .then((response) => response.text())
    .then((body) => {
      return body;
    });
}

/*
 * Returns a JSON response from TDX Web API populated with data from configured report.
 */
async function _fetchNewTicketReport() {
  const admin_bearer_token = await _fetchAdminApiToken();
  const reportId = 224500; // tstat Standard Report id
  const withData = true;
  const dataSortExpression = ""; // default sorting

  // format the report uri
  const saved_report_url =
    `https://service.uoregon.edu/${process.env.API_ENVIRONMENT_MODE}` +
    `/api/reports/${reportId}?withData=${withData}&dataSortExpression=${dataSortExpression}`;

  const report = fetch(saved_report_url, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${admin_bearer_token}`,
    },
    method: "GET",
  }).then((response) => {
    if (!response.ok) {
      return { error: "Failed to fetch report." };
    }
    return response.json();
  });

  return report;
}

(() => {
  const filter: TicketFilter = {
    layout: "chart",
    grouping: "building",
    building: ["Lillis Business Complex", "Willamette Hall"],
  };

  Ticket.findAll({
    where: {
      data: TicketFieldsAsFilter(filter),
    },
  }).then((data) => console.log(data));
})();

export default {
  // TODO -- IN PROGRESS
  fetchFilteredTickets: async (req: Request, res: Response) => {
    const filter: TicketFilter = req.body!.filter;

    const data = Ticket.findAll({
      where: {
        data: TicketFieldsAsFilter(filter),
      },
    });

    res.json(data).status(200).send();
    return;
  },
  fetchNewTicketReport: async (req: Request, res: Response) => {
    const data = await _fetchNewTicketReport();

    if (data.error) {
      res.json(data).status(400).send();
      return;
    }

    res.json(data).status(200).send();
    return;
  },
  refreshReport: async (req: Request, res: Response) => {
    const data = await _fetchNewTicketReport();

    const { DataRows, DisplayedColumns } = data;

    await Ticket.truncate().then((result) => console.log(result));

    // iterate through each row in the DataRows array
    for (let i = 0; i < DataRows.length; i++) {
      const row = DataRows[i];
      await Ticket.create({
        data: {
          ticket_id: row.TicketID,
          title: row.Title,
          assigned_to: row.ResponsibleGroupName,
          requestor: row.CustomerName,
          email: row.ContactEmail,
          department: row.AccountName,
          location: row.LocationName,
          room: row.LocationRoomName,
          created: row.CreatedDate,
          modified: row.LastModifiedDate,
          status: row.StatusName,
          diagnoses: row["132559"] ? row["132559"].split(", ") : [], // NOTE -> This corresponds to the "diagnosis" header. Could refactor to read from { DisplayedColumns }
        } satisfies TicketFieldsType,
      });
    }
    const message = { message: "Completed report cache refresh." };

    console.log(message.message);
    res.status(200).send(message);
    return;
  },
  reportCacheGenerationTime: async (req: Request, res: Response) => {
    const exampleTicket = await Ticket.findOne({
      attributes: ["createdAt"],
    });

    if (!exampleTicket) {
      res.status(500).send({ error: "Failed to fetch timestamp." });
      return;
    }
    const timestamp = exampleTicket?.createdAt.getTime();

    console.log(timestamp);
    res.status(200).send({ timestamp: timestamp });
    return;
  },
};
