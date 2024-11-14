// Import necessary dependencies and components
import { useState } from 'react';
import ProjectUploads from './ProjectUploads';
import CloudUploads from './CloudUploads';

// MediaMenu component that provides two tabs, "Project Uploads" and "Cloud Uploads"
// Users can toggle between the two to view different upload options
function MediaMenu() {
  // State variable to keep track of the active tab ('project' or 'cloud')
  const [activeTab, setActiveTab] = useState("project");

  return (
    <div className="space-y-6">
      {/* Tab Toggle Buttons for Project Uploads and Cloud Uploads */}
      <div className="flex mb-4">
        
        {/* Project Uploads Button */}
        {/* When clicked, this button sets the activeTab to 'project' */}
        <button
          onClick={() => setActiveTab("project")}
          className={`py-2 px-4 font-semibold relative ${
            activeTab === "project" ? "text-blue-500" : "text-gray-500"
          } whitespace-nowrap`}
        >
          Project Uploads
          
          {/* Active Tab Indicator */}
          {/* Displays an underline when 'project' tab is active */}
          {activeTab === "project" && (
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[50px] h-[2px] bg-blue-500"></span>
          )}
        </button>

        {/* Cloud Uploads Button */}
        {/* When clicked, this button sets the activeTab to 'cloud' */}
        <button
          onClick={() => setActiveTab("cloud")}
          className={`py-2 px-4 font-semibold relative ${
            activeTab === "cloud" ? "text-blue-500" : "text-gray-500"
          } whitespace-nowrap`}
        >
          Cloud Uploads
          
          {/* Active Tab Indicator */}
          {/* Displays an underline when 'cloud' tab is active */}
          {activeTab === "cloud" && (
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[50px] h-[2px] bg-blue-500"></span>
          )}
        </button>
      </div>

      {/* Render content based on the active tab */}
      {/* If activeTab is 'project', show ProjectUploads component, else show CloudUploads component */}
      {activeTab === "project" ? <ProjectUploads /> : <CloudUploads />}
    </div>
  );
}

export default MediaMenu;
