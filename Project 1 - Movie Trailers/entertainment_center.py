import media
import fresh_tomatoes


def run():
    """ Execute python code to create the movie page"""
    fresh_tomatoes.open_movies_page(
            get_movie_list()
           )


def get_movie_list():
    """ Create a list of movies to render"""
    # Create an populate list.
    # Initially created an empty list and then added using append, however this is a better
    # solution
    movie_list = [
        media.Movie(
            "The Matrix",
            "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg",
            "https://www.youtube.com/watch?v=tGgCqGm_6Hs"),
        media.Movie(
            "The Matrix Reloaded",
            "https://upload.wikimedia.org/wikipedia/en/b/ba/Poster_-_The_Matrix_Reloaded.jpg",
            "https://www.youtube.com/watch?v=zmYE3tg26Qc"),
        media.Movie(
            "The Matrix Revolutions",
            "https://upload.wikimedia.org/wikipedia/en/3/34/Matrix_revolutions_ver7.jpg",
            "https://www.youtube.com/watch?v=hMbexEPAOQI"),
        media.Movie(
            "Schindler's List",
            "https://upload.wikimedia.org/wikipedia/en/3/38/Schindler%27s_List_movie.jpg",
            "https://www.youtube.com/watch?v=gG22XNhtnoY"),
        media.Movie(
            "You've Got Mail",
            "https://upload.wikimedia.org/wikipedia/en/e/ee/You%27ve_Got_Mail.jpg",
            "https://www.youtube.com/watch?v=bjP4s7UUnK8"),
        media.Movie(
            "When Harry met Sally",
            "https://upload.wikimedia.org/wikipedia/en/1/1c/WhenHarryMetSallyPoster.jpg",
            "https://www.youtube.com/watch?v=k7utaa1Ify4"),
        media.Movie(
            "Sleepless in Seattle",
            "https://upload.wikimedia.org/wikipedia/en/e/e1/Sleepless_in_seattle.jpg",
            "https://www.youtube.com/watch?v=-Lj2U-cmyek"),
        media.Movie(
            "Saving Private Ryan",
            "https://upload.wikimedia.org/wikipedia/en/a/ac/Saving_Private_Ryan_poster.jpg",
            "https://www.youtube.com/watch?v=RYExstiQlLc"),
        media.Movie(
            "Forrest Gump",
            "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg",
            "https://www.youtube.com/watch?v=bLvqoHBptjg"),
        media.Movie(
            "Cast Away",
            "https://upload.wikimedia.org/wikipedia/en/a/a7/Cast_away_film_poster.jpg",
            "https://www.youtube.com/watch?v=4tVklCz2jcI")
        ]

    return movie_list


run()

