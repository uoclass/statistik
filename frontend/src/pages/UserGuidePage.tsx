import Button from "@/components/Button";
import Icon from "@/components/Icons";

const ExpandButton = () => {
  return (
    <Button onClick={() => window.open("/user-guide", "_blank")}>
      Open in new tab
      <Icon icon="expand" width={24} />
    </Button>
  );
};

function UserGuidePage() {
  return (
    <div>
      <h1>User Guide</h1>
      <ExpandButton />
      <p>Welcome to the user guide!</p>
    </div>
  );
}

export default UserGuidePage;
