import React from 'react'

const help = () => {
  return (
    <div className='max-w-5xl mx-auto mt-14'>
      <div className="font-bold justify-around flex flex-col md:flex-row gap-4 bg-green-500 mb-3 ">
        <a href="/"><button>HOME</button></a>
        <a href="/contactus"><button> CONTACT US</button></a>
        <a href="/help"><button>HELP/SUPPORT</button></a>
        <a href="/login" className='border-2 border-black px-4 py-2 rounded-lg'><button>LOG IN</button></a>
        <a href="/register" className='border-2 border-black px-4 py-2 rounded-lg'><button>REGISTER</button></a>
      </div>
      <div>
        <img src="/images/help.png"  alt="help" srcset="" />
        <p class="text-center text-6xl font-extrabold py-8">How can we help you ?</p>
        <div type="text" class=" my-5 w-full bg-slate-700 py-3 pl-2 rounded-lg" >
        <h1>User Manual: Child Care Agent Placement System</h1>
Introduction
<p>Welcome to the Child Care Agent Placement System! We aim to provide a seamless experience for every 
user, focusing on ensuring that Child Protective Agents perform at their highest potential while managing 
cases. Our system is designed to enhance procedural task assignments, offer location updates during 
fieldwork, and generate comprehensive reports upon task completion. Your role is critical in the 
development and empowerment of the children we serve. This manual will guide you through the 
functionalities of the system to help you perform your duties effectively.</p>

Table of Contents
<p>1. [System Overview](#system-overview)</p>
<p>2. [Getting Started](#getting-started)</p>
<p>3. [Agent Dashboard](#agent-dashboard)</p>
<p>4. [Task Assignment](#task-assignment)</p>
<p>5. [Field Work Location Updates](#field-work-location-updates)</p>
<p>6. [Report Generation](#report-generation)</p>
<p>7. [Troubleshooting and Support](#troubleshooting-and-support)</p>
<p>8. [Contact Information](#contact-information)</p>


---
System Overview
<p>The Child Care Agent Placement System is designed to facilitate:
- **Procedural Task Assignment:** Efficiently assign and track tasks assigned to Child Protective Agents.
- **Location Updates:** Monitor and update locations of agents during fieldwork to ensure safety and 
efficiency.
- **Report Generation:** Create detailed reports upon completion of tasks to evaluate performance and 
progress.
Getting Started</p>

1. **Login:**
 - Open the Child Care Agent Placement System on your device.
 - Enter your credentials (username and password) provided by the agency.
 - Click on the “Login” button to access the system.
2. **User Roles:**
 - **Administrator:** Manages the overall system, assigns tasks, and generates reports.
 - **Agent:** Handles assigned tasks, updates locations, and completes reports.
## Agent Dashboard
Upon logging in, you will be directed to the Agent Dashboard. This interface provides:
- Task Overview:** Displays your current tasks, including details such as task ID, description, and 
deadlines.
- Location Status:** Shows the current status of your location and any updates needed.
- Notifications:** Provides alerts and updates regarding new tasks or system changes.
Task Assignment
1. **Receiving Tasks:**
 - Tasks will be assigned to you based on your current workload and availability.
 - You will receive notifications about new tasks through the dashboard.
2. Viewing and Accepting Tasks:
 - Click on the “Tasks” tab to view all assigned tasks.
 - Select a task to see detailed information.
 - Click “Accept Task” to confirm your engagement.
3. Updating Task Status:
 - Once you start working on a task, update its status to “In Progress.”
 - Upon completion, change the status to “Completed” and provide any relevant notes.
Field Work Location Updates
1. Tracking Your Location:
 - Enable location services on your device to ensure accurate tracking.
 - The system will automatically update your location in real-time during fieldwork.
2. Updating Location Manually:
 - If automatic updates are not available, go to the “Location” tab.
 - Enter your current location and any additional notes.
3. Safety Alerts:
 - In case of emergencies or safety concerns, use the “Emergency Alert” feature to notify the agency 
immediately.
Report Generation
1. **Creating a Report:**
 - After completing a task, navigate to the “Reports” section.
 - Click “Generate New Report” and fill in the required details about the task, including observations and 
outcomes.
2. **Submitting Reports:**
 - Review the report for accuracy.
 - Click “Submit” to send the report to the agency for evaluation.
3. **Reviewing Past Reports:**
 - Access “Report History” to view and review previously submitted reports.
## Troubleshooting and Support
1. **Common Issues:**
 - **Login Problems:** Ensure your credentials are correct and try resetting your password if necessary.
 - **Location Updates:** Verify that location services are enabled on your device.
 - **Task Assignment Issues:** Contact your supervisor if tasks are not appearing or cannot be 
accepted.
2. **Technical Support:**
 - For any technical issues or questions, contact our IT support team at 
[support@childcareagency.com](mailto:support@childcareagency.com) or call (123) 456-7890.
Contact Information
- **Agency Office:**
 - Address: 5080 kajiado
 - Phone: (123) 456-7890
 - Email: [info@childcareagency.com](mailto:info@childcareagency.com)
- **Technical Support:**
 - Email: [support@childcareagency.com](mailto:support@childcareagency.com)
 - Phone: 0720049070
---
Thank you for using the Child Care Agent Placement System. Your dedication and hard work play a crucial 
role in the safety and well-being of the children we serve. If you have any questions or need further 
assistance, please do not hesitate to reach out.
        </div>
      </div>
      <div class="bg-[#D9D9D9] flex flex-row items-center justify-around py-16">
          <div>
              <img src="/images/eye.png"  alt="eye" srcset="" />
              <p>Getting Started</p>
          </div>
          <div>
              <img src="/images/topissues.png"  alt="topissues" srcset="" />
              <p>Top issues</p>
          </div>
          <div>
              <img src="/images/question.png"  alt="question" srcset="" />
              <p>Questions</p>
          </div>
          <div>
              <img src="/images/check.png"  alt="check" srcset="" />
              <p>TroubleShooting</p>
          </div>
      </div>
    </div>

  )
}

export default help