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
      <h1 className="text-5xl! mb-3">User Guide</h1>
      <ExpandButton />
      <h2 className="mt-5">Introduction</h2>
      <p>Statistik is a web application for visualizing information about technology support tickets in TeamDynamix. By setting a display option and a set of filters, you can customize exactly how the ticket information will be shown — then you can save a chart for quick reference or to include in a report, for example.</p>
      <h2 className="mt-5">Quick Start</h2>
      <h3 className="mt-3">1. Sign in</h3>
      <p>To start, click “sign in” at the top right-hand corner of the navigation bar. Enter your University of Oregon email address and the password provided to you by a Classroom Support Specialist.</p>
      <img src="public/user_guide_image0.png" className="mb-2 border-2 border-grey-300 max-w-3/4" alt="Sign in screenshot" />
      <h3 className="mt-5">2. Create your first view</h3>
      <p>A <strong>view</strong> is a way of showing ticket information in a chart. It consists of the following two settings:</p>
      <ul className="list-disc ml-5">
          <li>
            A <strong>grouping</strong>: What each bar on the chart represents
            <br />
            <span className="text-[#707070]">e.g. a building, a requestor, a week in the term…</span>
          </li>
          <li>
            A set of <strong>filters</strong>: What tickets actually make it through to the chart
              <br />
              <span className="text-[#707070]">e.g. only tickets within a certain date range, only tickets in Lillis Hall…</span>
            </li>
      </ul>
      <p>Time to generate your first view. Click "new view" on the navigation bar.</p>
      <img src="public/user_guide_image1.png" className="mb-2 border-2 border-grey-300 max-w-3/4" alt="New view screenshot" />
      <p>The ‘new view’ page comes with a very basic predefined view which shows the number of tickets received by each building. Just scroll past the red bar chart for now until you reach the view creation form below it.</p>
      <p>In the grey callout box, press ‘Refresh’ once to pull the latest ticket data from TeamDynamix.</p>
      <p>In the view creation form, use the “Grouping” dropdown menu to select the grouping for your view. Use the dropdown menus, date selectors, and/or text fields to specify your filters.</p>
      <img src="public/user_guide_image2.png" className="mb-2 border-2 border-grey-300 max-w-3/4" alt="View creation form screenshot" />
      <p>When you’re done setting your grouping and set of filters, press "Generate view." Your new graph will appear above the view creation form!</p>
      <img src="public/user_guide_image3.png" className="mb-2 border-2 border-grey-300 max-w-3/4" alt="Generated view screenshot" />
      <h3 className="mt-5">3. Save your view as an image</h3>
      <p>Once you are satisfied with your view, you can save it as an image file by clicking the 'Save Image' button below the chart. This will download an image of the chart, including its title and description, as a PNG file named "statistik-chart.png" to your computer.</p>
      <img src="public/user_guide_image4.png" className="mb-2 border-2 border-grey-300 max-w-3/4" alt="Save image screenshot" />
      <p>You can then use this image in presentations, reports, or any other documentation where you need to share ticket analytics.</p>
      <h3 className="mt-5">4. Access your views in the Dashboard</h3>
      <p>Click "dashboard" in the navigation bar. All views that you generate will be automatically saved to the <strong>dashboard</strong> here. You can click on any of the listed views to expand it and get an overview of its grouping and filter settings.</p>
      <p>Once expanded, you will also get the options to “delete view” or “open view page”:</p>
      <ul className="list-disc ml-5">
          <li><strong>Delete view</strong>: Click to remove the view from your dashboard.</li>
          <li><strong>Open view page</strong>: Click to reopen the view creation form with the selected view’s grouping and filter settings autofilled for you. This lets you quickly adjust a view’s settings or recreate it with newer ticket data (see the next section) without having to fill out the form all over again.</li>
      </ul>
      <img src="public/user_guide_image5.png" className="mb-2 border-2 border-grey-300 max-w-3/4" alt="Dashboard screenshot" />
      <h3 className="mt-5">5. Refresh the information in a view</h3>
      <p>In the ‘new view’ page (see section 2), the grey callout box above the view creation form states the last time ticket data was pulled from TeamDynamix.</p>
      <p>If you are looking at a previously generated view, you should click "Refreshr and then click ‘Generate View’ again. This will ensure you’re working with the most up-to-date ticket information, even in a view that was originally created in the past.</p>
      <p>In general, it’s a good practice to click "Refresh" once per day.</p>
      <img src="public/user_guide_image6.png" className="mb-2 border-2 border-grey-30 max-w-3/4" alt="Refresh view screenshot" />
      <h3 className="mt-5">6. Sign out</h3>
      <p>Anyone signed into the Statistik web application can access information about TeamDynamix tickets, which contain sensitive data such as our requestor’s contact information. To minimize any opportunities for unauthorized access, make sure to sign out when you’re done using the app.</p>
      <p>Click "sign out" in the top right-hand corner of the navigation bar.</p>
      <img src="public/user_guide_image7.png" className="mb-2 border-2 border-grey-300 max-w-3/4" alt="Sign out screenshot" />
      <h3 className="mt-5">7. Return to the User Guide at any time</h3>
      <p>To access this User Guide at any time, click "user guide" in the navigation bar at the top of any page. You do not need to be logged in to view the User Guide. If you want to expand the tab to use alongside the application, you can do so easily with the “Open in new tab” button.</p>
      <img src="public/user_guide_image8.png" alt="User guide screenshot" />
    </div>
  );
}

export default UserGuidePage;
