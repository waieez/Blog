Laurie Voss [talk](https://www.youtube.com/watch?v=NWo-RIHiEJ4)

Stuff Everybody Knows Except You
Touch Type: You'll be much faster
Code Editor: Pick one
Write Bash Scripts
HTML - semantic value of html tags
CSS - understand box model, don't just trial and error
CSS preprocessors

Javascript - learn javascript not coffeescript/framework because that's what you need to debug
General Principle, no right way to write any language.

#Rich Apps vs Flat Sites
Choose the right tool.
APM, load to dell ratio
Indexability

#Everybody starts with JS off.
Have a fallback to show your users while everything is compiling
example, google spreadsheets loads html that looks like a spreadsheet while it fetches the other files.

#UX antipatterns
don't mess with peoples expectations,
don't scroll horizontally
button's do things, links go places
nobody cares about carsousels
don't reimplement form ui
don't use modals

Solve the user's problem

#state
don't break links
keep urls meaningful - pushstate

sessions
cookies sent w/ every req
don't use cookie for storage
httponly=true don't allow script access to cookies
secure=true

localstorage 5mbs, isn't sent w/ every req

#Security
always be thinking about security, implement security
never trust user, evil and dumb

XSS injection attack, tricked into executing js

CSRF

Input Validation

Regex

SQL Injection

Command Injection

Auth
Authentication who are you?
Authorization can you do this?

Salt and Hash Password

Performance
Speed > all
speed > efficiency
throughput = req/sec

Caching = speed
CDN

full page caching
fragment caching
query caching

debug & tests.
autmate tests

don't be superstitutious
don't commit code you don't understand
write code you don't understand.

read the error logs
write helpful error messages

coding antipatterns
god object - passing state between functions
giant function signatures - pass options object instead

be boring, innovate only on novel things

code readability

TIMEZONES UTC, convert time at the last possible moment
ISO 8601

UTF8 all the things

Databases
pick the right db for the job
CAP, pick two
Consistency
Avaliablility
Partition Tolerance

Indexibility
Durability
Scalability
Speed/Throughput

Memory
Memcache
Redis,
Mongo - 
Couch - good at eventual consistency, gofuckyourselfqueries
LevelDb, allows many dbs at a time

Relational
Mysql - baseline
Postgres - good but harder to config
Oracle - good-doeseverything plus you get a person, but ridic expensive

colum stores - just throw boxes
cassandra - colum store hi write-slow read
riak - tunable cassandra

Neo4j - graph db

filesystem

HDFS/HBASE - lots of data to process
Hadoop

S3 - Scales forever

Replication

Accessbility

Deployment

Design for Failure

Be Kind

Value yourself