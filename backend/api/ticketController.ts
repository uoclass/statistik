import { Ticket, TicketFieldsType } from "../models/ticket.model.ts";
import sequelize from "../database.ts";
import dotenv from "dotenv";
import { where, Op, OpTypes } from "@sequelize/core";
import { WhereAttributeHashValue } from "@sequelize/core/_non-semver-use-at-your-own-risk_/abstract-dialect/where-sql-builder-types.js";
import { CreatedAt } from "@sequelize/core/decorators-legacy";

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

function TicketFieldsAsFilter(
  filter: TicketFilter,
): WhereAttributeHashValue<TicketFieldsType> {
  const formattedFilter: WhereAttributeHashValue<TicketFieldsType> = {};

  if (filter.termStart) {
    formattedFilter["jsonAttribute.termStart"] = { [Op.gte]: filter.termStart };
  }
  if (filter.termEnd) {
    formattedFilter["jsonAttribute.termEnd"] = { [Op.lte]: filter.termEnd };
  }
  if (filter.building) {
    formattedFilter["jsonAttribute.building"] = { [Op.in]: filter.building };
  }
  if (filter.room) {
    formattedFilter["jsonAttribute.room"] = { [Op.eq]: filter.room };
  }
  if (filter.requestor) {
    formattedFilter["jsonAttribute.requestor"] = { [Op.in]: filter.requestor };
  }
  if (filter.titleSubstring) {
    formattedFilter["jsonAttribute.title"] = {
      [Op.like]: `%${filter.titleSubstring}%`,
    };
  }
  if (filter.diagnoses) {
    if (filter.matchAllDiagnoses) {
      // Use AND logic for matching all diagnoses
      formattedFilter["jsonAttribute.diagnoses"] = {
        [Op.and]: filter.diagnoses.map((diag) => ({ [Op.eq]: diag })),
      };
    } else {
      // Use OR logic for matching any diagnosis
      formattedFilter["jsonAttribute.diagnoses"] = {
        [Op.or]: filter.diagnoses.map((diag) => ({ [Op.eq]: diag })),
      };
    }
  }

  return formattedFilter;
}

function dLog(input: string) {
  console.log(`dLOGGING: ${input}`);
}

/*
 * Fetches the administrator JWT bearer-token for making TDX Web API calls
 */
async function _fetchAdminApiToken() {
  // mode: TDWebApi | SBTDWebApi
  const apiMode = process.env.API_ENVIRONMENT_MODE;
  let api_url = `https://service.uoregon.edu/${apiMode}/api/auth/loginadmin`;
  if (apiMode !== "TDWebApi" && apiMode !== "SBTDWebApi") {
    console.log(apiMode);
    console.log("Undefined API mode. Use 'SBTDWebApi' or 'TDWebApi'");
    return { error: "Undefined API mode." };
  }

  const credentials_body = JSON.stringify({
    BEID: process.env.TDX_ADMIN_BEID,
    WebServicesKey: process.env.TDX_ADMIN_WEBKEY,
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
  // report request parameters
  const admin_bearer_token = await _fetchAdminApiToken();
  const reportId = 224500; // tstat Standard Report id
  const withData = true; // include data in http respones
  const dataSortExpression = ""; // default sorting

  // format the report uri
  const saved_report_url =
    `https://service.uoregon.edu/${process.env.API_ENVIRONMENT_MODE}` +
    `/api/reports/${reportId}?withData=${withData}&dataSortExpression=${dataSortExpression}`;

  const report_request = await fetch(saved_report_url, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${admin_bearer_token}`,
    },
    method: "GET",
  });

  const data = await report_request.json();

  if (!report_request.ok) {
    return { error: "Failed to fetch report." };
  }

  return data;
}

export default {
  // TODO -- IN PROGRESS
  fetchFilteredTickets: async (req, res) => {
    const filter: TicketFilter = req.body!.filter;

    Ticket.findAll({
      where: {
        data: TicketFieldsAsFilter(filter),
      },
    });

    return res.status(200).send();
  },
  fetchNewTicketReport: async (req, res) => {
    const data = await _fetchNewTicketReport();

    if (data.error) {
      return res.status(400).json({ error: "Failed to fetch report." });
    }

    return res.json(data);
  },
  refreshReport: async (req, res) => {
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
    const message = { message: "Completed update in refreshTicketData()" };
    console.log(message.message);
    return res.status(200).send(message);
  },
  reportCacheGenerationTime: async (req, res) => {
    const exampleTicket = await Ticket.findOne({
      attributes: ["createdAt"],
    });

    return res
      .status(200)
      .send({ timestamp: exampleTicket.createdAt.toString });
  },
};
