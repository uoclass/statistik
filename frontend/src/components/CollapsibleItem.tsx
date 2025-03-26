import type React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/provider/AuthProvider";
import { formatDate } from "@/lib/utils";
import { ChevronDown, ChevronUp, TrashIcon, ExternalLink } from "lucide-react";
import { IFormInputs, ViewItem, CollapsibleItemProps } from "@/types";
import Button from "./Button";
import "./collapsible-item.css";

function generateConfigTitle(config: IFormInputs): string {
  const parts: string[] = [];

  // grouping info
  if (config.grouping !== "none") {
    parts.push(`Grouped by ${config.grouping}`);
  }

  // date range if present
  if (config.termStart) {
    parts.push(`from ${formatDate(config.termStart)}`);
  }

  if (config.termEnd) {
    parts.push(` to ${formatDate(config.termEnd)}`);
  }

  // location filters
  if (config.building && config.building.length > 0) {
    const buildingNames = config.building.map((b) => b.label).join(", ");
    parts.push(`in ${buildingNames}`);

    if (config.room) {
      parts.push(`room ${config.room}`);
    }
  }

  // requestor info
  if (config.requestor && config.requestor.length > 0) {
    const requestorNames = config.requestor.map((r) => r.label).join(", ");
    parts.push(`by ${requestorNames}`);
  }

  // diagnoses
  if (config.diagnoses && config.diagnoses.length > 0) {
    const diagnosesNames = config.diagnoses.map((d) => d.label).join(", ");
    const matchType = config.matchAllDiagnoses ? "all" : "any";
    parts.push(`with ${matchType} diagnoses: ${diagnosesNames}`);
  }

  // title search
  if (config.titleSubstring) {
    parts.push(`containing "${config.titleSubstring}"`);
  }

  // view type
  parts.push(`in ${config.layout} view`);

  return parts.join(" ");
}

export const CollapsibleItem: React.FC<CollapsibleItemProps> = ({
  item,
  viewsState,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  const toggleOpen = () => setIsOpen(!isOpen);
  const handleViewDeletion = async (item: ViewItem) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/tickets/delete-config`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        configId: item.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          console.log("Successfully deleted view.");
        } else {
          console.error("Failed to delete view.");
        }
      });
    viewsState.setSavedViews(
      viewsState.savedViews.filter((f: ViewItem) => f.id !== item.id),
    );
  };

  const handleSavedViewOpen = async (filter: IFormInputs) => {
    navigate("/new-view", { state: { filter: filter } });
    return;
  };

  return (
    <div className="collapsible-item">
      <button className="collapsible-header" onClick={toggleOpen}>
        <div className="collapsible-header-content">
          {generateConfigTitle(item.viewConfig)}
        </div>
        <div className="collapsible-icon">
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {isOpen && (
        <div className="collapsible-content">
          <div className="content-grid">
            <div className="content-section">
              <h4>View Configuration</h4>
              <div className="content-row">
                <span className="label">Layout:</span>
                <span>{item.viewConfig.layout}</span>
              </div>
              <div className="content-row">
                <span className="label">Grouping:</span>
                <span>{item.viewConfig.grouping}</span>
              </div>
            </div>

            <div>
              <div className="content-section">
                <h4>Filters</h4>
                <div className="content-row">
                  <span className="label">Room:</span>
                  <span>{item.viewConfig.room || "—"}</span>
                </div>
                <div className="content-row">
                  <span className="label">Buildings:</span>
                  <span>
                    {item.viewConfig.building?.length
                      ? item.viewConfig.building
                          .map((building) => building.label)
                          .join(", ")
                      : "—"}
                  </span>
                </div>
                <div className="content-row">
                  <span className="label">Start:</span>
                  <span>{item.viewConfig.termStart || "—"}</span>
                </div>
                <div className="content-row">
                  <span className="label">End:</span>
                  <span>{item.viewConfig.termEnd || "—"}</span>
                </div>
              </div>

              <div className="content-row">
                <span className="label">Diagnoses:</span>
                <span>
                  {item.viewConfig.diagnoses?.length
                    ? item.viewConfig.diagnoses.join(", ")
                    : "—"}
                </span>
              </div>
              <div className="content-row">
                <span className="label">Match All:</span>
                <span>{item.viewConfig.matchAllDiagnoses ? "Yes" : "No"}</span>
              </div>
              <div className="content-row">
                <span className="label">Requestors:</span>
                <span>
                  {item.viewConfig.requestor?.length
                    ? item.viewConfig.requestor.map((r) => r.label).join(", ")
                    : "—"}
                </span>
              </div>
            </div>
          </div>
          <div className="content-row inline-flex gap-2">
            <Button
              type="button"
              className="place-items-center"
              onClick={() => handleSavedViewOpen(item.viewConfig)}
            >
              Open view page
              <ExternalLink width={22} />
            </Button>
            <Button
              type="button"
              className="place-items-center"
              onClick={() => handleViewDeletion(item)}
            >
              Delete view
              <TrashIcon size={20} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
