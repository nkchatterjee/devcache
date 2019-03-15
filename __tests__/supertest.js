const request = require('supertest');

const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      // Note that we return the evaluation of `request` here! It evaluates to
      // a promise, so Jest knows not to say this test passes until that
      // promise resolves. See https://jestjs.io/docs/en/asynchronous
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });

  describe('/build/bundle.js', () => {
    describe('GET', () => {
      it('responds with 200 status and application/javascript content type', () => {
        return request(server)
          .get('/build/bundle.js')
          .expect('Content-Type', /application\/javascript/)
          .expect(200);
      })
    })
  });

  describe('/api/user', () => {
    describe('GET', () => {
      it('responds with status 200 and an application/json of content-type AND the object contains keys userInfo and snippets ', () => {
        return request(server)
          .get('/api/user')
          .set('Cookie', ['user_id=32', 'hey=yo'])
          .expect(200)
          .expect('Content-Type', /application\/json/)
          .expect(function (res) {
            if (!res.body.userInfo) {
              throw new Error('got no userInfo!')
            }
            if (!res.body.snippets) {
              throw new Error('got no snippets!')
            }
          })
      });
    })
  })

  describe('/gettags', () => {
    describe('GET', () => {
      it('should return an array of objects, with 200 status and app/json', () => {
        return request(server)
          .get('/gettags')
          .set('Cookie', ['user_id=32', 'hey=yo'])
          .expect(200)
          .expect('Content-Type', /application\/json/)
          .expect(function (res) {
            if (!Array.isArray(res.body)) {
              throw new Error('got no tags!')
            }
          })
      });
    })
  });

  describe('/getsnippetsbyuser', () => {
    describe('GET', () => {
      it('should return an array of objects with app/json and 200 status', () => {
        return request(server)
          .get('/getsnippetsbyuser/?username=shane')
          .set('Cookie', ['user_id=32', 'hey=yo'])
          .expect(200)
          .expect('Content-Type', /application\/json/)
          .expect(function (res) {
            if (!Array.isArray(res.body)) {
              throw new Error('got no tags!')
            }
          })
      });
    })
  });

  describe('/getsnippetsbytag', () => {
    describe('GET', () => {
      it('should return an array of objects with app/json and 200 status', () => {
        return request(server)
          .get('/getsnippetsbytag/?tag=Redux')
          .set('Cookie', ['user_id=32', 'hey=yo'])
          .expect(200)
          .expect('Content-Type', /application\/json/)
          .expect(function (res) {
            if (!Array.isArray(res.body)) {
              throw new Error('got no tags!')
            }
          })
      });
    })
  });

  describe('/mysnippets', ()=>{
    describe('GET', ()=>{
      it('should return content-type text/html with a 200 status',()=>{
        return request(server)
          .get('/mysnippets')
          .expect(200)
          .expect('Content-Type', /text\/html/)
      })
    })
  })
  
  describe('/login', ()=>{
    describe('POST', ()=>{
      it('should accept a correct user/pass combination with a  201 status', ()=>{
        return request(server)
          .post('/login')
          .send({username:'shane', password:'shane'})
          .expect(201)
          .expect((res)=>{
            console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiii')
            console.log(res.headers['set-cookie'])
          })
      })
    })
  })
  describe('/logout', ()=>{
    describe('GET', ()=>{
      it('should return an object with a key/value pair of loggedout:true', ()=>{
        return request(server)
          .get('/logout')
          .expect((res)=>{
            expect(typeof res.body).toEqual('object');
            expect(res.body.loggedout).toEqual(true);
          })
      })
    })
  })

  describe('/api/getalltags', ()=>{
    describe('GET', ()=>{
      it('should return an array of tag objects',()=>{
        return request(server)
          .get('/api/getalltags')
          .expect((res)=>{
            if(!Array.isArray(res.body)){
              throw new Error('fetched item is not an array')
            }
            if (typeof res.body[0] !== 'object'){
              throw new Error('items in the array are not object')
            }
        })
      })
    })
  })

});

  /*
  describe('/signup', ()=>{
    describe('POST', ()=>{
      it('should accept a new username / password with a 201 status',()=>{

      })
    })
  })
  */

  // describe('/deletesnippetbyid', () => {
  //   describe('GET', () => {
  //     it('should return a 200 status and the string `ok`', () => {
  //       return request(server)
  //         .get('/deletesnippetbyid?id=198')
  //         .set('Cookie', ['user_id=32', 'hey=yo'])
  //         .expect(200)
  //       // incomplete!
  //     })
  //   });
  // })




  // describe('/markets', () => {
  //   describe('GET', () => {
  //     it('responds with 200 status and application/json content type', () => {
  //       return request(server)
  //         .get('/markets')
  //         .expect('Content-Type', /application\/json/)
  //         .expect(200);
  //     });

  //     // For this test, you'll need to inspect the body of the response and
  //     // ensure it contains the markets list. Check the markets.dev.json file
  //     // in the dev database to get an idea of what shape you're expecting.
  //     it('markets from "DB" json are in body of response', () => {
  //       return request(server)
  //         .get('/markets')
  //         .expect(function (res) {
  //           if (!Array.isArray(res.body)) throw new Error("markets list is not an array")
  //         })
  //     });
  //   });

  //   describe('PUT', () => {
  //     it('responds with 200 status and application/json content type', () => {
  //       const marketList = [{ location: 'azkaban', cards: 1 }];
  //       return request(server)
  //         .put('/markets')
  //         .send(marketList)
  //         .expect('Content-Type', /application\/json/)
  //         .expect(200)
  //     });

  //     it('responds with the updated market list', () => {
  //       const marketList = [{ location: 'azkaban', cards: 1 }];
  //       return request(server)
  //         .put('/markets')
  //         .send(marketList)
  //         .expect(function (res) {
  //           expect(res.body).toEqual(marketList);
  //         })
  //     });
  //     // TODO: Refactor to expect res.body.error to be instance of Error
  //     // Help Desk??
  //     it('responds to invalid request with 400 status and error message in body', () => {
  //       return request(server)
  //         .put('/markets')
  //         .send([{ "evilKey": "doEvil" }])
  //         .expect(res => {
  //           expect(res.body.error)
  //         })
  //         .expect(400)
  //     });
  //   });
  // });
  //});
