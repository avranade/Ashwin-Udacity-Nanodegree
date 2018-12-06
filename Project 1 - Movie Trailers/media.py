class Movie:
    """This is a class representation of a Movie Object"""

    def __init__(self, movie_title, movie_poster_image_url, movie_trailer_url):
        """Constructor for the Movie Class
		:param movie_title: Title for the movie
		:param movie_poster_image_url: URl For the image
		:param movie_trailer_url: Youtube URL for the trailer
		"""

        # Map variables to variables defined in the fresh_tomatoes.py file
        self.title = movie_title
        self.poster_image_url = movie_poster_image_url
        self.trailer_youtube_url = movie_trailer_url
