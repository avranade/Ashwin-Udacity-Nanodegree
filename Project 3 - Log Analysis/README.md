# Logs Analysis

This is the third project of the Full Stack Web Developer Nanodegree

As part of this project, I wrote python code to connect to a news database, run sql queries to analyse it and the output the results in the form of a report of answers to 3 questions 

## How do I run this?

### 1. Setup: Configure VM & Database (based on instructions in 'Elements of SQL' lesson)

**Step 1:** Download and install [Vagrant](https://www.vagrantup.com/) and [VirtualBox](https://www.virtualbox.org). We’ll need these tools to setup and manage the Virtual Machine (VM). 

Vagrant version used: Vagrant 2.2.2
VirtualBox version used: VirtualBox 5.1.38r122592

I used this combination because I was getting the following error when I used an older version of Vagrant

```
The box ‘bento/ubuntu-16.04’ could not be found or
could not be accessed in the remote catalog. If this is a private
box on HashiCorp’s Atlas, please verify you’re logged in via
vagrant login. Also, please double-check the name. The expanded
URL and error message are shown below:
```

**Step 2:** Download the VM configuration from the [assets folder](assets/) or clone from this [github repo](https://github.com/udacity/fullstack-nanodegree-vm). 

The configuration file  specifies the arrangement of resources (processors, memory, disks, network adapters, etc) assigned to a virtual machine. 


**Step 3:**  Download the database dump from the [assets folder](assets/) or [this link](https://d17h27t6h515a5.cloudfront.net/topher/2016/August/57b5f748_newsdata/newsdata.zip) or from the 'Prepare the software and Data' portion of the Project section on Udacity.

Then, copy the database dump `newsdata.sql` to the `vagrant/` (Look for the location where you downloaded and extracted the VM conf).

**Step 4:**  Copy/clone the python programs (`reporting_tool.py` and `database_provisioner.py`) from the [Code folder](code/). Then, copy them to the `vagrant/` (one of the folders you downloaded in step 2).

**Step 5:** Open the terminal. Then, run the following commands:

```
# Install & Configure VM
cd /path/to/vagrant
vagrant up

# Log into machine
vagrant ssh

# Populate database using dump in shared folder 
cd /vagrant 
psql -d news -f newsdata.sql

# Log out of machine
# <Ctrl + D>

# Destroy machine once done
vagrant destroy

```

Note: The first time you run [Vagrant Up](https://www.vagrantup.com/docs/cli/up.html) command, you need to wait a while after running the command. The VM is being setup and provisioned which takes a long time. 


### 2. Run the Reporting Tool

Open the terminal. Then, run the following commands:

```
# Launch & Login to machine
cd /path/to/vagrant
vagrant up
vagrant ssh

# Open shared folder
cd /vagrant 

# Run the program
python reporting_tool.py
```

## Project Rubric

|SECTION|SUB-SECTION|CRITERIA|SPECS. MET?|
|---|---|---|---|
| Functionality | Functionality | Running the code displays the correct answers to each of the questions in the lab description.|Yes|
| | Compatibility: Database | The code works with the (unchanged) database schema from the lab description. <br>It is OK to add views to the database, but don't modify or rename the existing tables. |Yes|
| | Compatibility: Language | The code may be written in Python 2 or Python 3 but must be consistent. It should start with a correct [shebang line](https://en.wikipedia.org/wiki/Shebang_%28Unix%29) to indicate the Python version. |Yes|
| | Well-formatted text output | The code presents its output in clearly formatted plain text. Imagine that you are looking at this text in an email message, not on a web page. |Yes|
| | Database queries | The code connects to and queries an SQL database. It does not use answers hardcoded into the application code. |Yes|
| Code quality | No errors | The project code runs without any error messages or warnings from the language interpreter. |Yes|
| | Application code style | The code conforms to the PEP8 style recommendations.<br>You can install the pycodestyle tool to test this, with pip install pycodestyle or pip3 install pycodestyle (Python 3).<br><br>In order for this requirement to pass, running the pycodestyle tool on your code should produce zero warnings.<br><br>(pycodestyle was formerly known as pep8. These are the same thing.) | Yes|
| | SQL code quality | When the application fetches data from multiple tables, it uses a single query with a join, rather than multiple queries. Each of the questions must be answered using one SQL query. |Yes|
| README file | README file describes work | The README file includes instructions for how to run the program, as well as a description of the program's design.<br><br>Imagine a person who knows Python and SQL well, but has not done this project. If that person read the README would they know how to run this code? |Yes|
| | README file includes view definitions, if any | If the code relies on views created in the database, the README file includes the create view statements for these views.<br>(If the code does not depend on views, ignore this requirement.) |Views not used|

## Output: Refer [output.txt](output.txt)

### Q1. What are the most popular three articles of all time?

* Candidate is jerk, alleges rival - 338647 views
* Bears love berries, alleges bear - 253801 views
* Bad things gone, say good people - 170098 views


### Q2. Who are the most popular article authors of all time?

* Ursula La Multa - 507594 views
* Rudolf von Treppenwitz - 423457 views
* Anonymous Contributor - 170098 views
* Markoff Chaney - 84557 views


### Q3. On which days did more than 1% of requests lead to errors?

* July      17, 2016 -  2.26% errors



## References/ Tools

- [PgAdmin4 for testing queriesin UI](https://www.pgadmin.org/)
- [String Functions & Operators](https://www.postgresql.org/docs/9.5/static/functions-string.html)
- [Data Type Formatting](https://www.postgresql.org/docs/8.3/static/functions-formatting.html)
- [Casting](https://www.postgresql.org/docs/10/static/sql-createcast.html)
- [Aggregate Functions](https://www.postgresql.org/docs/9.5/static/functions-aggregate.html)
- [Subqueries](https://www.postgresql.org/docs/9.4/static/functions-subquery.html)
- [PSQL CLI Commands](https://www.postgresql.org/docs/9.2/static/app-psql.html)

