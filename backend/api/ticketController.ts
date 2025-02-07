import { Ticket, TicketFieldsType } from "../models/ticket.model.ts";
import { Diagnosis } from "models/diagnosis.model.ts";
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
  building?: string;
  room?: string;
  requestor?: string;
  titleSubstring?: string;
  diagnoses?: Array<{ value: string; label: string }>;
  matchAllDiagnoses?: boolean;
}

function ValidateTicketFilter(filter: TicketFilter) {
  return;
}

async function getFilteredTickets(filter: TicketFilter) {
  let reformedDiagnoses = new Array<string>();
  if (filter.diagnoses) {
    reformedDiagnoses = filter.diagnoses.map((pair) => pair.value);
  }

  return await Ticket.findAll({
    where: {
      created: {
        [Op.gte]: filter.termStart || new Date("1970-01-01"),
        [Op.lte]: filter.termEnd || new Date(),
      },
      ...(filter.building && {
        location: { [Op.in]: filter.building!.split(", ") },
      }),
      ...(filter.room && { room: { [Op.eq]: filter.room } }),
      ...(filter.requestor && {
        requestor: { [Op.in]: filter.requestor!.split(", ") },
      }),
      ...(filter.titleSubstring && {
        title: { [Op.iLike]: `%${filter.titleSubstring}%` },
      }),
    },
    include: [
      {
        association: "diagnoses",
        ...(filter.diagnoses &&
          filter.diagnoses.length > 0 && {
            where: {
              value: {
                [Op.in]: reformedDiagnoses,
              },
            },
          }),
      },
    ],
  });
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

// (() => {
//   const filter: TicketFilter = {
//     layout: "chart",
//     grouping: "building",
//     building: "Lillis Business Complex, Willamette Hall",
//   };

//   getFilteredTickets(filter).then((result) =>
//     console.log(result.map((r) => r.get({ plain: true }))),
//   );
// })();

export default {
  // TODO -- IN PROGRESS
  fetchFilteredTickets: async (req: Request, res: Response) => {
    const filter: TicketFilter = req.body!.filter;
    console.log(filter);
    const data = await getFilteredTickets(filter);

    const formattedData = data.map((r) => r.get({ plain: true }));

    // console.log(formattedData);
    res.json(formattedData).status(200).send();
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

    await Ticket.destroy({ where: {} }).then((result) => console.log(result));

    // iterate through each row in the DataRows array
    for (let i = 0; i < DataRows.length; i++) {
      const row = DataRows[i];
      const ticket = await Ticket.create({
        ticket_id: row.TicketID.toString(),
        title: row.Title,
        assigned_to: row.ResponsibleGroupName,
        requestor: row.CustomerName,
        email: row.ContactEmail,
        department: row.AccountName,
        location: row.LocationName,
        room: row.LocationRoomName,
        created: new Date(row.CreatedDate),
        modified: new Date(row.LastModifiedDate),
        status: row.StatusName,
      });

      const diagnosisList = row["132559"] || "";
      const d = await Diagnosis.findAll({
        where: {
          value: diagnosisList.split(", "),
        },
      });

      await ticket.setDiagnoses(d);
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
