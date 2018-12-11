import psycopg2

# Database name is stored separately for ease of use/portability.
#   In this case, we only have one function connecting to DB
#   If we have multiple functions operating on DB,
#   changing DB name on those will get tedious
DATABASE_NAME = "news"

#   Query to generate answer for 1st question
SQL_QUERY_THREE_MOST_POPULAR_ARTICLES = """
        select
            articles.title,
            count(log.id) as total
        from
            articles
            left join log on log.path = ('/article/' || articles.slug)
        group by
            articles.title
        order by
            total desc
        limit
            3
        """

#   Query to generate answer for 2nd question
SQL_QUERY_MOST_POPULAR_AUTHORS = """
        select
            authors.name,
            count(log.id)
        from
            authors
            left join articles on articles.author = authors.id
            left join log on log.path = ('/article/' || articles.slug)
        group by
            authors.name
        order by
            count desc
        """

#   Query to generate answer for 3rd question
SQL_QUERY_DAYS_WITH_HIGH_ERRORS = """
        select
            to_char(errors_by_day.date,'Month DD, YYYY') as date,
            to_char(((errors_by_day.count::decimal
                    /requests_by_day.count::decimal)*100)
                    ,'9.99')
                    || '%' as percentage
        from
            (select date(time),count(*) from log
                        group by date(time)) as requests_by_day,
            (select date(time),count(*) from log where status != '200 OK'
                        group by date(time)) as errors_by_day
        where
            requests_by_day.date = errors_by_day.date
            and ((errors_by_day.count::decimal
                    /requests_by_day.count::decimal)*100) > 1;
        """


#   Function to connect and execute query is kept separate
#   This is to follow DRY principle
def connect_and_fetch_data(query):
    """Setup connection to db using psycopg2, execute query and fetch results
    :param query: Query to be executed
    """
    db = psycopg2.connect(database=DATABASE_NAME)
    cursor = db.cursor()
    cursor.execute(query)
    return cursor.fetchall()
    db.close()


#   Getters/wrappers to pass sql query to executing function
def get_three_most_popular_articles():
    return connect_and_fetch_data(SQL_QUERY_THREE_MOST_POPULAR_ARTICLES)


def get_most_popular_authors():
    return connect_and_fetch_data(SQL_QUERY_MOST_POPULAR_AUTHORS)


def get_days_with_higher_errors():
    return connect_and_fetch_data(SQL_QUERY_DAYS_WITH_HIGH_ERRORS)
