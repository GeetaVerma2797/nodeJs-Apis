# nodeJs

movie apis

IMDB apis used if data is not in the local collection db

There are 7 apis:

"headers": [
              {
                "enabled": true,
                "name": "Authorization",
                "value": "dgd463464fe5d48f424a4eba745hgfhgd"
              }
            ]
          }

#static header value created because there is no user validation

1. Movie By Title
    eg: http://localhost:3001/api/movieByTitle/widow

    response: 

2. Movie By Id
    eg: http://localhost:3001/api/62e637147335b4286d422272

3. Movie By Released Year
    eg: http://localhost:3001/api/releasedYear/1998-2008
        http://localhost:3001/api/releasedYear/2008

4. Movie By Higher than Rating
    eg: http://localhost:3001/api/rating/higherThan/2

5. Movie By Lower than Rating
    eg: http://localhost:3001/api/rating/lowerThan/9

6. Movie By Rating Range
    http://localhost:3001/api/ratingRange/2-7

7. Movie by Genre
    http://localhost:3001/api/byGenre/Mystery
