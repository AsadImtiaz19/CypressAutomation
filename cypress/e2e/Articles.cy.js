describe('Article Apis - E2E Test', () => {

  //POST Articles 

  let id 
  let articleSlug
  let articleCommentId
  const requestBody = {
    id: 'string',
    slug: 'string',
    title: 'string',
    description: 'string',
    body: 'string',
    author_id: 0,
    author: {
      id: 0,
      email: 'john.doe@example.com',
      provider: 'email',
      social_id: '1234567890',
      first_name: 'John',
      last_name: 'Doe',
      photo: {
        id: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae',
        path: 'https://example.com/path/to/file.jpg'
      },
      role: {
        id: 0,
        name: 'admin'
      },
      status: {
        id: 0,
        name: 'active'
      },
      created_at: '2024-08-30T17:34:28.183Z',
      updated_at: '2024-08-30T17:34:28.183Z',
      deleted_at: '2024-08-30T17:34:28.183Z'
    },
    comments: ['string'],
    tagList: ['string'],
    created_at: '2024-08-30T17:34:28.183Z',
    updated_at: '2024-08-30T17:34:28.183Z'
  };

  const expectedResponse = {
    body: 'string',
    description: 'string',
    title: 'string',
    slug: 'string',
    id: 'bcbc459c-89b3-4f43-84b7-4b4718c510d6',
    author: {
      id: 3,
      first_name: 'Asad',
      last_name: 'Imtiaz',
      role: {
        id: 2,
        name: 'User',
        __entity: 'RoleEntity'
      },
      status: {
        id: 2,
        name: 'Inactive',
        __entity: 'StatusEntity'
      },
      created_at: '2024-08-30T12:19:28.352Z',
      updated_at: '2024-08-30T12:19:28.352Z',
      deleted_at: null
    },
    tagList: ['string'],
    created_at: '2024-08-30T12:36:32.639Z',
    updated_at: '2024-08-30T12:36:32.639Z'
  };

  it('should verify the article data in the response', () => {
    cy.request({
      method: 'POST',
      url: '/api/v1/articles',
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6eyJpZCI6MSwibmFtZSI6IkFkbWluIiwiX19lbnRpdHkiOiJSb2xlRW50aXR5In0sInNlc3Npb25JZCI6MTcsImlhdCI6MTcyNDkyMTY4OCwiZXhwIjoxNzI1NTI2NDg4fQ.upxYf99TgmUgeRyxgq4zpKC-tfCpd5SZI-DBxMZJ3d8'

      },
      body: requestBody
    }).then((response) => {
      id = response.body.id
      articleSlug = response.body.slug
      // Verify the status code
      expect(response.status).to.eq(201); 

      // Verify the response body structure
      const responseBody = response.body;

      expect(responseBody).to.have.property('body').that.is.a('string');
      expect(responseBody).to.have.property('description').that.is.a('string');
      expect(responseBody).to.have.property('title').that.is.a('string');
      expect(responseBody).to.have.property('slug').that.is.a('string').and.is.not.empty;
      expect(responseBody).to.have.property('id').that.is.a('string').and.is.not.empty;

      // Check the author object
      const author = responseBody.author;
      expect(author).to.have.property('id').that.is.a('number');
      expect(author).to.have.property('first_name').that.is.a('string').and.is.not.empty;
      expect(author).to.have.property('last_name').that.is.a('string').and.is.not.empty;

      // Check the role object within author
      const role = author.role;
      expect(role).to.have.property('id').that.is.a('number');
      expect(role).to.have.property('name').that.is.a('string').and.is.not.empty;
      expect(role).to.have.property('__entity', 'RoleEntity');

      // Check the status object within author
      const status = author.status;
      expect(status).to.have.property('id').that.is.a('number');
      expect(status).to.have.property('name').that.is.a('string').and.is.not.empty;
      expect(status).to.have.property('__entity', 'StatusEntity');

      // Verify tagList is an array and contains "string"
      expect(responseBody.tagList).to.be.an('array').that.includes('string');

      // Check for timestamps
      expect(responseBody).to.have.property('created_at').that.is.a('string');
      expect(responseBody).to.have.property('updated_at').that.is.a('string');
    });
  });


//GET ARTICLES API
  
  it('should return the correct articles data', () => {
    cy.request({
      method: 'GET',
      url: '/api/v1/articles',
      headers: {
         //  Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6eyJpZCI6MiwibmFtZSI6IlVzZXIiLCJfX2VudGl0eSI6IlJvbGVFbnRpdHkifSwic2Vzc2lvbklkIjoxLCJpYXQiOjE3MjUwMzg0MjAsImV4cCI6MTcyNTY0MzIyMH0.itGeoIm4iOj-UsMgEdjbaHaVO_vWvwi5v2C4NFBKa6A'
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6eyJpZCI6MSwibmFtZSI6IkFkbWluIiwiX19lbnRpdHkiOiJSb2xlRW50aXR5In0sInNlc3Npb25JZCI6MTcsImlhdCI6MTcyNDkyMTY4OCwiZXhwIjoxNzI1NTI2NDg4fQ.upxYf99TgmUgeRyxgq4zpKC-tfCpd5SZI-DBxMZJ3d8'
      }
    }).then((response) => {
      expect(response.status).to.eq(200); // Verify the status code
      expect(response.body).to.have.property('data'); // Verify the response has a "data" property
      

      const article = response.body.data[0];
      
  
   // Check for the properties of the article object
      expect(article).to.have.property('body', 'string');
      expect(article).to.have.property('description', 'string');
      expect(article).to.have.property('title', 'string');
      expect(article).to.have.property('slug').to.be.a('string');
      expect(article).to.have.property('id').to.be.a('string');

      // Check for the properties of the author object
      const author = article.author;
      expect(author).to.have.property('id').to.be.a('number');
      expect(author).to.have.property('first_name').to.be.a('string');
      expect(author).to.have.property('last_name').to.be.a('string');

      // Check for the properties of the role object within author
      const role = author.role;
      expect(role).to.have.property('id', 2);
      expect(role).to.have.property('name', 'User');
      expect(role).to.have.property('__entity', 'RoleEntity');

      // Check for the properties of the status object within author
      const status = author.status;
      expect(status).to.have.property('id', 2);
      expect(status).to.have.property('name', 'Inactive');
      expect(status).to.have.property('__entity', 'StatusEntity');

      // Verify tagList is an array and contains "string"
      expect(article.tagList).to.be.an('array').that.includes('string');

      // Check for timestamps
      expect(article).to.have.property('created_at').to.be.a('string');
      expect(article).to.have.property('updated_at').to.be.a('string');
  
    });
  });


// GET ARTICLE BY ID


it('should verify the article data in the response', () => {
  cy.request({
    method: 'GET',
    url: '/api/v1/articles/bcbc459c-89b3-4f43-84b7-4b4718c510d6',
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6eyJpZCI6MSwibmFtZSI6IkFkbWluIiwiX19lbnRpdHkiOiJSb2xlRW50aXR5In0sInNlc3Npb25JZCI6MTcsImlhdCI6MTcyNDkyMTY4OCwiZXhwIjoxNzI1NTI2NDg4fQ.upxYf99TgmUgeRyxgq4zpKC-tfCpd5SZI-DBxMZJ3d8'
      // Replace with your valid token
    },
    failOnStatusCode: false // To handle cases where the status code is not 2xx or 3xx
  }).then((response) => {
    // Check for 401 Unauthorized response
    if (response.status === 401) {
      cy.log('Unauthorized request, please check your token.');
      return;
    }

    // Verify the status code
    expect(response.status).to.eq(200); // Adjust if needed

    // Verify the response body structure
    const responseBody = response.body;

    expect(responseBody).to.have.property('body').that.is.a('string');
    expect(responseBody).to.have.property('description').that.is.a('string');
    expect(responseBody).to.have.property('title').that.is.a('string');
    expect(responseBody).to.have.property('slug').that.is.a('string').and.is.not.empty;
    expect(responseBody).to.have.property('id').that.is.a('string').and.is.not.empty;

    // Check the author object
    const author = responseBody.author;
    expect(author).to.have.property('id').to.be.a('number');
    expect(author).to.have.property('first_name').to.be.a('string');
    expect(author).to.have.property('last_name').to.be.a('string');

    // Check the role object within author
    const role = author.role;
    expect(role).to.have.property('id', 2);
    expect(role).to.have.property('name', 'User');
    expect(role).to.have.property('__entity', 'RoleEntity');

    // Check the status object within author
    const status = author.status;
    expect(status).to.have.property('id', 2);
    expect(status).to.have.property('name', 'Inactive');
    expect(status).to.have.property('__entity', 'StatusEntity');

    // Verify tagList is an array and contains "string"
    expect(responseBody.tagList).to.be.an('array').that.includes('string');

    // Check for timestamps
    expect(responseBody).to.have.property('created_at').that.is.a('string');
    expect(responseBody).to.have.property('updated_at').that.is.a('string');
  });
});


//PATCH ARTICLE 


  it('should verify the article data in the response', () => {
    cy.request({
      method: 'PATCH',
      url: '/api/v1/articles/bcbc459c-89b3-4f43-84b7-4b4718c510d6',
      headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6eyJpZCI6MSwibmFtZSI6IkFkbWluIiwiX19lbnRpdHkiOiJSb2xlRW50aXR5In0sInNlc3Npb25JZCI6MTcsImlhdCI6MTcyNDkyMTY4OCwiZXhwIjoxNzI1NTI2NDg4fQ.upxYf99TgmUgeRyxgq4zpKC-tfCpd5SZI-DBxMZJ3d8'
      // Replace with your valid token
      },
      failOnStatusCode: false // To handle cases where the status code is not 2xx or 3xx
    }).then((response) => {
      // Check for 401 Unauthorized response
      if (response.status === 401) {
        cy.log('Unauthorized request, please check your token.');
        return;
      }

      // Verify the status code
      expect(response.status).to.eq(200);

      // Verify the response body structure
      const responseBody = response.body;

      // Validate general properties
      expect(responseBody).to.have.property('body').that.is.a('string');
      expect(responseBody).to.have.property('description').that.is.a('string');
      expect(responseBody).to.have.property('title').that.is.a('string');
      expect(responseBody).to.have.property('slug').that.is.a('string').and.is.not.empty;
      expect(responseBody).to.have.property('id').that.is.a('string').and.is.not.empty;

      // Check the author object
      const author = responseBody.author;
      expect(author).to.have.property('id').that.is.a('number');
      expect(author).to.have.property('first_name').that.is.a('string').and.is.not.empty;
      expect(author).to.have.property('last_name').that.is.a('string').and.is.not.empty;

      // Check the role object within author
      const role = author.role;
      expect(role).to.have.property('id').that.is.a('number');
      expect(role).to.have.property('name').that.is.a('string').and.is.not.empty;
      expect(role).to.have.property('__entity').that.is.a('string');

      // Check the status object within author
      const status = author.status;
      expect(status).to.have.property('id').that.is.a('number');
      expect(status).to.have.property('name').that.is.a('string').and.is.not.empty;
      expect(status).to.have.property('__entity').that.is.a('string');

      // Verify tagList is an array and contains strings
      expect(responseBody.tagList).to.be.an('array').that.is.not.empty;
      responseBody.tagList.forEach(tag => {
        expect(tag).to.be.a('string');
      });

      // Check for timestamps
      expect(responseBody).to.have.property('created_at').that.is.a('string');
      expect(responseBody).to.have.property('updated_at').that.is.a('string');
    });
  });



    // Post Comment using Slug

it('should successfully post a comment and verify the response', () => {
  const requestBody = {
    body: "Mycomment"
  };

  cy.request({
    method: 'POST',
    url: `/api/v1/articles/${articleSlug}/comments`,
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6eyJpZCI6MSwibmFtZSI6IkFkbWluIiwiX19lbnRpdHkiOiJSb2xlRW50aXR5In0sInNlc3Npb25JZCI6MTcsImlhdCI6MTcyNDkyMTY4OCwiZXhwIjoxNzI1NTI2NDg4fQ.upxYf99TgmUgeRyxgq4zpKC-tfCpd5SZI-DBxMZJ3d8'
      },
    body: requestBody,
    
  }).then((response) => {
    articleCommentId = response.body.id
    // Verify the status code
    expect(response.status).to.eq(201); // Adjust based on expected status code

    // Verify the response body structure and content
    expect(response.body).to.have.property('body').that.is.a('string').and.is.not.empty;
    expect(response.body).to.have.property('id').that.is.a('string').and.is.not.empty;
    expect(response.body).to.have.property('created_at').that.is.a('string').and.is.not.empty;
    expect(response.body).to.have.property('updated_at').that.is.a('string').and.is.not.empty;

    // Check the author object
    const author = response.body.author;
    expect(author).to.have.property('id').that.is.a('number');
    expect(author).to.have.property('first_name').to.be.a('string');
    expect(author).to.have.property('last_name').to.be.a('string');

    // Check the role object within author
    const role = author.role;
    expect(role).to.have.property('id').that.is.a('number');
    expect(role).to.have.property('name', 'User');
    expect(role).to.have.property('__entity', 'RoleEntity');

    // Check the status object within author
    const status = author.status;
    expect(status).to.have.property('id').that.is.a('number');
    expect(status).to.have.property('name', 'Inactive');
    expect(status).to.have.property('__entity', 'StatusEntity');
  });
});


// GET COMMENTS
it('should retrieve comments for a given article', () => {
  

  cy.request({
    method: 'GET',
    url: `/api/v1/articles/${articleSlug}/comments`,
    headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6eyJpZCI6MSwibmFtZSI6IkFkbWluIiwiX19lbnRpdHkiOiJSb2xlRW50aXR5In0sInNlc3Npb25JZCI6MTcsImlhdCI6MTcyNDkyMTY4OCwiZXhwIjoxNzI1NTI2NDg4fQ.upxYf99TgmUgeRyxgq4zpKC-tfCpd5SZI-DBxMZJ3d8'

       }
  }).then((response) => {
    // Verify the status code
    expect(response.status).to.eq(200);

    // Verify the response body structure
    expect(response.body).to.have.property('data').that.is.an('array');
    expect(response.body).to.have.property('hasNextPage').that.is.a('boolean');

    // Check if data array is not empty
    if (response.body.data.length > 0) {
      const comment = response.body.data[0];
      // Verify the structure of the comment object
      expect(comment).to.have.property('body').that.is.a('string');
      expect(comment).to.have.property('id').that.is.a('string');
      expect(comment).to.have.property('created_at').that.is.a('string');
      expect(comment).to.have.property('updated_at').that.is.a('string');

      // Check the author object
      const author = comment.author;
      expect(author).to.have.property('id').that.is.a('number');
      expect(author).to.have.property('first_name').that.is.a('string');
      expect(author).to.have.property('last_name').that.is.a('string');
      expect(author).to.have.property('role').that.is.an('object');
      expect(author).to.have.property('status').that.is.an('object');

      // Check role object within author
      const role = author.role;
      expect(role).to.have.property('id').that.is.a('number');
      expect(role).to.have.property('name').that.is.a('string');
      expect(role).to.have.property('__entity').that.is.a('string');

      // Check status object within author
      const status = author.status;
      expect(status).to.have.property('id').that.is.a('number');
      expect(status).to.have.property('name').that.is.a('string');
      expect(status).to.have.property('__entity').that.is.a('string');
    }
  });
});



// DELETE COMMENT
it('should successfully delete a comment by ID', () => {

  cy.request({
    method: 'DELETE',
    url: `/api/v1/articles/${articleSlug}/comments/${articleCommentId}`,
    headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6eyJpZCI6MSwibmFtZSI6IkFkbWluIiwiX19lbnRpdHkiOiJSb2xlRW50aXR5In0sInNlc3Npb25JZCI6MTcsImlhdCI6MTcyNDkyMTY4OCwiZXhwIjoxNzI1NTI2NDg4fQ.upxYf99TgmUgeRyxgq4zpKC-tfCpd5SZI-DBxMZJ3d8'
  },
    failOnStatusCode: false // To handle cases where the status code is not 2xx or 3xx
  }).then((response) => {
    // Verify the status code
    expect(response.status).to.eq(200); // Adjust based on expected status code

    // Verify response headers
    expect(response.headers).to.have.property('access-control-allow-origin', '*');
    expect(response.headers).to.have.property('content-length', '0');
    expect(response.headers).to.have.property('x-powered-by', 'Express');

    // Optionally, check for response body if any (in this case, it should be empty)
    expect(response.body).to.be.empty;
  });
});


// DELETE ARTICLE

it('should successfully delete an article by ID', () => {

      
  cy.request({
    method: 'DELETE',
    url: '/api/v1/articles/'+id,
    headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6eyJpZCI6MSwibmFtZSI6IkFkbWluIiwiX19lbnRpdHkiOiJSb2xlRW50aXR5In0sInNlc3Npb25JZCI6MTcsImlhdCI6MTcyNDkyMTY4OCwiZXhwIjoxNzI1NTI2NDg4fQ.upxYf99TgmUgeRyxgq4zpKC-tfCpd5SZI-DBxMZJ3d8'

              },
    
  }).then((response) => {
    // Verify the status code
   expect(response.status).to.eq(200);

    // Verify response headers
    expect(response.headers).to.have.property('access-control-allow-origin', '*');
    expect(response.headers).to.have.property('content-length', '0');
    expect(response.headers).to.have.property('x-powered-by', 'Express');

    // Optionally, check for response body if any (in this case, it should be empty)
    expect(response.body).to.be.empty;
  });
});


});





