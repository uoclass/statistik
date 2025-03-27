/*
 * Landing Page
 * by Alex JPS
 * 2024-03-06
 *
 * Defines the ipsum page component,
 * This contains lorem ipsum text, but can also be used for testing.
 */

import TicketListItem from "../components/TicketListItem";

function IpsumPage() {
  /* This component displays the landing page.
   */
  const ticket = {
    id: 7106,
    ticket_id: "19653817",
    title: "HEDCO 146 - replace PTZ pro2 camera",
    assigned_to: "IS-AV Classroom Support",
    requestor: "Role/Dept. Account classrooms",
    email: "classrooms@uoregon.edu",
    department: "Information Services",
    location: "HEDCO Education Bldg",
    room: "146",
    created: new Date("2024-10-18T06:14:41.000Z"),
    modified: new Date("2024-10-18T22:29:08.000Z"),
    status: "Closed",
    createdAt: new Date("2025-02-11T19:06:53.483Z"),
    updatedAt: new Date("2025-02-11T19:06:53.483Z"),
    diagnoses: []
      // {
      //   id: 70,
      //   value: "HyFlex/Room Camera",
      //   createdAt: new Date("2025-02-05T23:19:30.500Z"),
      //   updatedAt: new Date("2025-02-05T23:19:30.500Z"),
      //   MarkedDiagnoses: {
      //     createdAt: new Date("2025-02-11T19:06:53.484Z"),
      //     updatedAt: new Date("2025-02-11T19:06:53.484Z"),
      //     diagnosisId: 70,
      //     ticketId: 7106,
      //   },
      // },
    // ],
  };
  return <TicketListItem ticket={ticket} />;
}

export default IpsumPage;
