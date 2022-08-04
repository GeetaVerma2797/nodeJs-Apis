const Movie = require('../models/movie');
const imdb = require('imdb-api')
const authToken = process.env.authToken;
const imdbKey = "865625e2";

module.exports = {
	movieByTitle: async function (req, res, next) {
        try {
            console.log(req.headers["authorization"])
            if(req.headers["authorization"] == authToken){
                const movieTitle = decodeURI(req.params.title);
                let findQuery = await Movie.find({title : movieTitle});
                        console.log("docs", findQuery)

                    if(findQuery.length){
                            res.json({
                                status:{
                                    message: "Data Successfully fetched",
                        
                                    code: 200
                                },
                                data:findQuery,
                            });
                        }
                        else {
                            console.log(movieTitle);
                           const movieData = await imdb.get({name: movieTitle}, {apiKey: '865625e2', timeout: 30000})
                               console.log("data", movieData)
                            console.log("dghf", movieData.title)
    
                              if(movieData){
                                console.log("inside movieData");
                                let date = new Date(movieData.released);
                                let releaseYear = date.getFullYear();
                                let rate = movieData.ratings[0] ? (movieData.ratings[0].value).split("/")[0] : 0;
                                console.log("release year", releaseYear, rate)
                                const movie = { 
                                    title : movieData.title,
                                    releasedYear: releaseYear,
                                    rating: rate,
                                    geners: movieData.genres,
                                };
                                const findQuery1 = await Movie.findOneAndUpdate({title : movieData.title}, movie);
                                console.log("findquete1", findQuery1)
                                if(findQuery1){
                                    res.json({
                                        status:{
                                            message: "Data Successfully fetched",
                                
                                            code: 200
                                        },
                                        data:findQuery1,
                                    });
                                }else {

                                   
    
                                    const movie = new Movie({ 
                                          title : movieData.title,
                                          releasedYear: releaseYear,
                                          rating: rate,
                                          geners: movieData.genres,
                                      });
                                      
                                    //   let saved = post.addMovie(movie);
                                    await movie.save().catch(e=>{
                                        console.log(e);
                                
                                    });
                                    console.log("saved", movie);
                                    let dataQuery = await Movie.findOne({ title : movieData.title });
                                    console.log("findData", dataQuery)
                                    if(dataQuery){
                                      res.json({
                                        status:{
                                            message: "Data Successfully saved in Imdb and fetched",
                                
                                            code: 200
                                        },
                                        data:dataQuery,
                                    });
                                  } else {
                                    res.json({
                                        status:{
                                            message: "empty set",
                                
                                            code: 201
                                        }
                                    });
                                  }
                                }
                        
                            
                        }
                    }
            } else {
                res.json({
                    status:{
                        message: "Unauthorized user",
            
                        code: 401
                    }
                });
            }
            
        } catch (error) {
            console.log(error)
        }
    },
    movieById: async function (req, res, next) {
        try {
            console.log(req.headers["authorization"])
            if(req.headers["authorization"] == authToken){

                const movieId = decodeURI(req.params.id);
                let findQuery = await Movie.find({_id : movieId});
                        console.log("docs", findQuery)

                    if(findQuery.length){
                            res.json({
                                status:{
                                    message: "Data Successfully fetched",
                        
                                    code: 200
                                },
                                data:findQuery,
                            });
                        }
                        else {
                                res.json({
                                    status:{
                                        message: "Data not found",
                            
                                        code: 201
                                    }
                                });
                              }
                      
    
                     
            } else {
                res.json({
                    status:{
                        message: "Unauthorized user",
            
                        code: 401
                    }
                });
            }
            
        } catch (error) {
            console.log(error)
        }
    },
    movieByReleasedYear: async function (req, res, next) {
        try {
            console.log(req.headers["authorization"])
            if(req.headers["authorization"] == authToken){

                const year = decodeURI(req.params.year).split('-');
                console.log("year", year[0], year[1]);
                let findQuery;
                if(year[1]){
                    findQuery = await Movie.find({$and : [{releasedYear : {$gt : year[0] }},{releasedYear : {$lt : year[1] }}]});
                } else {
                    findQuery = await Movie.find({releasedYear : year});
                }
                        console.log("docs", findQuery)

                    if(findQuery.length){
                            res.json({
                                status:{
                                    message: "Data Successfully fetched",
                        
                                    code: 200
                                },
                                data:findQuery,
                            });
                        }
                        else {
                                res.json({
                                    status:{
                                        message: "Data not found",
                            
                                        code: 201
                                    }
                                });
                              }
                      
    
                     
            } else {
                res.json({
                    status:{
                        message: "Unauthorized user",
            
                        code: 401
                    }
                });
            }
            
        } catch (error) {
            console.log(error)
        }
    },
    movieByRatingHigher: async function (req, res, next) {
        try {
            console.log(req.headers["authorization"])
            if(req.headers["authorization"] == authToken){

                const rate = decodeURI(req.params.rate)
                let findQuery;
                findQuery = await Movie.find({rating : {$gt : rate}});
                        console.log("docs", findQuery)

                    if(findQuery.length){
                            res.json({
                                status:{
                                    message: "Data Successfully fetched",
                        
                                    code: 200
                                },
                                data:findQuery,
                            });
                        }
                        else {
                                res.json({
                                    status:{
                                        message: "Data not found",
                            
                                        code: 201
                                    }
                                });
                              }
                      
    
                     
            } else {
                res.json({
                    status:{
                        message: "Unauthorized user",
            
                        code: 401
                    }
                });
            }
            
        } catch (error) {
            console.log(error)
        }
    },
    movieByRatingLower: async function (req, res, next) {
        try {
            console.log(req.headers["authorization"])
            if(req.headers["authorization"] == authToken){

                const rate = decodeURI(req.params.rate)
                let findQuery;
                findQuery = await Movie.find({rating : {$lt : rate}});
                        console.log("docs", findQuery)

                    if(findQuery.length){
                            res.json({
                                status:{
                                    message: "Data Successfully fetched",
                        
                                    code: 200
                                },
                                data:findQuery,
                            });
                        }
                        else {
                                res.json({
                                    status:{
                                        message: "Data not found",
                            
                                        code: 201
                                    }
                                });
                              }
                      
    
                     
            } else {
                res.json({
                    status:{
                        message: "Unauthorized user",
            
                        code: 401
                    }
                });
            }
            
        } catch (error) {
            console.log(error)
        }
},
movieByRatingRange: async function (req, res, next) {
    try {
        console.log(req.headers["authorization"])
        if(req.headers["authorization"] == authToken){

            const rate = decodeURI(req.params.rate).split('-');
            let findQuery;
            if(rate[1]){
                findQuery = await Movie.find({$and : [{rating : {$gt : rate[0] }},{rating : {$lt : rate[1] }}]});
            } else {
                findQuery = await Movie.find({rating : rate});
            }

                    console.log("docs", findQuery)

                if(findQuery.length){
                        res.json({
                            status:{
                                message: "Data Successfully fetched",
                    
                                code: 200
                            },
                            data:findQuery,
                        });
                    }
                    else {
                            res.json({
                                status:{
                                    message: "Data not found",
                        
                                    code: 201
                                }
                            });
                          }
                  

                 
        } else {
            res.json({
                status:{
                    message: "Unauthorized user",
        
                    code: 401
                }
            });
        }
        
    } catch (error) {
        console.log(error)
    }
},
movieByGenre: async function (req, res, next) {
    try {
        console.log(req.headers["authorization"])
        if(req.headers["authorization"] == authToken){

            const genre = decodeURI(req.params.genre);

            console.log("genre", genre)
            let findQuery;
                findQuery = await Movie.find({geners : genre } );

                    console.log("docs", findQuery)

                if(findQuery.length){
                        res.json({
                            status:{
                                message: "Data Successfully fetched",
                    
                                code: 200
                            },
                            data:findQuery,
                        });
                    }
                    else {
                            res.json({
                                status:{
                                    message: "Data not found",
                        
                                    code: 201
                                }
                            });
                          }
                  

                 
        } else {
            res.json({
                status:{
                    message: "Unauthorized user",
        
                    code: 401
                }
            });
        }
        
    } catch (error) {
        console.log(error)
    }
}
}

