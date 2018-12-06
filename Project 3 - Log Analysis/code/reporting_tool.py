#!/usr/bin/env python2.7

import database_provisioner


def run():
    """ Start the reporting tool """
    print ""
    generate_answer_for_question_1()

    print "\n"
    generate_answer_for_question_2()

    print "\n"
    generate_answer_for_question_3()


#   Functions to generate answers for the questions
#
#   Flow of control:
#   When run() is called, it executes each function call one after the other
#   E.g. run() calls generate_answer_for_question_1 which calls the getter in database_provisioner
#   The getter is configured to pass take the SQL query defined in the provisioner to the executor
#   which connects to DB and executes the sql query, returning the results which are then passed back to this function
def generate_answer_for_question_1():
    print "Q1. What are the most popular three articles of all time?\n"
    rows = database_provisioner.get_three_most_popular_articles()
    for row in rows:
        print "%s - %d views" % (row[0], row[1])


def generate_answer_for_question_2():
    print "Q2. Who are the most popular article authors of all time?\n"
    rows = database_provisioner.get_most_popular_authors()
    for row in rows:
        print "%s - %d views" % (row[0], row[1])


def generate_answer_for_question_3():
    print "Q3. On which days did more than 1% of requests lead to errors?\n"
    rows = database_provisioner.get_days_with_higher_errors()
    for row in rows:
        print "%s - %s errors" % (row[0], row[1])

#   Execute code
run()
