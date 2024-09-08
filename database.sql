create database agentcare;

CREATE TABLE users (
    accountType ENUM('admin', 'agent') NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL,
    personelid INT AUTO_INCREMENT PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    location VARCHAR(255) 
);

alter table users
add column agentType ENUM('desk-agent', 'field-agent');

alter table users
add column livelocations VARCHAR(255);





CREATE TABLE agentlocation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    from_location VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE agents (
    agentid VARCHAR(10) PRIMARY KEY,
    agentname VARCHAR(100) NOT NULL,
    categoryon VARCHAR(10) NOT NULL,
    status VARCHAR(10) NOT NULL,
    personelid INT NOT NULL,
    FOREIGN KEY (personelid) REFERENCES users(personelid)
);

CREATE TABLE completion_reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date_started DATE NOT NULL,
    date_completed DATE NOT NULL,
    case_id VARCHAR(50) NOT NULL,
    category ENUM('field', 'desk') NOT NULL,
    report_title VARCHAR(255) NOT NULL,
    summary TEXT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(personelid)
);

CREATE TABLE agent_locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    personelid INT NOT NULL,
    current_location VARCHAR(255),
    destination VARCHAR(255),
    is_field_work BOOLEAN DEFAULT FALSE,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (personelid) REFERENCES users(personelid)
);



-- Create Agents Table
CREATE TABLE agents (
    agentid VARCHAR(10) PRIMARY KEY,
    agentname VARCHAR(100) NOT NULL,
    categoryon VARCHAR(10) NOT NULL,
    status ENUM('busy', 'available') DEFAULT 'available',
    FOREIGN KEY (agentid) REFERENCES users(personelid)
);







-- Create Admin Users Table
CREATE TABLE admin_users (
    adminid INT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL,
    password VARCHAR(255) NOT NULL,
    confirmPassword VARCHAR(255) NOT NULL
);

-- Populate Agents Table
INSERT INTO agents (agentid, firstName, lastName, email, phone, password, confirmPassword)
SELECT personelid, firstName, lastName, email, phone, password, confirmPassword
FROM users
WHERE accountType = 'agent';

-- Populate Admin Users Table
INSERT INTO admin_users (adminid, firstName, lastName, email, phone, password, confirmPassword)
SELECT personelid, firstName, lastName, email, phone, password, confirmPassword
FROM users
WHERE accountType = 'admin';






















-- Guardinas
CREATE TABLE guardians (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255) UNIQUE NOT NULL,
    address TEXT,
    password VARCHAR(255) NOT NULL
);


CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',
    assigned_agent INT NULL,
    submitted_by INT NOT NULL,
    type ENUM('Fieldwork', 'Desk Work') NOT NULL,
    FOREIGN KEY (assigned_agent) REFERENCES users(personelid) ON DELETE SET NULL,
    FOREIGN KEY (submitted_by) REFERENCES guardians(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE completion_reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  datestarted DATE NOT NULL,
  datecompleted DATE NOT NULL,
  caseid VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  reporttitle VARCHAR(255) NOT NULL,
  summary TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


