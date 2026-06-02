CREATE DATABASE college_event_portal;

USE college_event_portal;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','student') NOT NULL
);

CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    event_name VARCHAR(200) NOT NULL,
    event_date DATE NOT NULL,
    venue VARCHAR(200) NOT NULL,
    capacity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE registrations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    event_id INT NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (student_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (event_id)
        REFERENCES events(id)
        ON DELETE CASCADE,

    UNIQUE(student_id, event_id)
);

INSERT INTO users
(name, username, password, role)
VALUES
(
'Administrator',
'admin',
'inspirante2026',
'admin'
);

INSERT INTO users
(name, username, password, role)
VALUES
('Asha Rao','asha.rao','student123','student'),
('Ravi Shetty','ravi.shetty','student123','student'),
('Meera Nair','meera.nair','student123','student'),
('Kiran Bhat','kiran.bhat','student123','student'),
('Divya Kamath','divya.kamath','student123','student'),
('Suresh Pai','suresh.pai','student123','student'),
('Ananya Hegde','ananya.hegde','student123','student'),
('Rohan Shenoy','rohan.shenoy','student123','student'),
('Nisha Prabhu','nisha.prabhu','student123','student'),
('Tejas Mallya','tejas.mallya','student123','student'),
('Priya Bangera','priya.bangera','student123','student');

INSERT INTO events
(event_name, event_date, venue, capacity)
VALUES
('Tech Symposium 2026','2026-07-10','Main Auditorium',120),
('Hackathon','2026-07-15','Lab Block C',40),
('Cultural Fest','2026-07-20','Open Amphitheatre',300),
('Workshop: React Basics','2026-07-22','Seminar Hall 2',30),
('Placement Prep Talk','2026-07-25','Main Auditorium',200);