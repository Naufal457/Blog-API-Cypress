describe('auth module', () => {
    const userData =  {
                name: 'John Doe',
                email: 'john@next.test',
                password: 'Secret_123',
            }
    describe('Register', ()=> {
        /**
        1.Error validation (null name, email and password
        2. Error invalid email format
        3. Error invalid password format    
        4. Register successfully
        5. Error Duplicate
         */

    it('should return error message for validation', () => {
            cy.request({
                method : 'POST',
                url: '/auth/register',
                failOnStatusCode : false
            }).then((response) => {
 /**

                expect(response.status).to.eq(400)
                expect(response.body.error).to.eq('Bad Request')
                expect('name should not be empty').to.be.oneOf(response.body.message)
                expect('email should not be empty').to.be.oneOf(response.body.message)
                expect('password should not be empty').to.be.oneOf(response.body.message)

*/
                cy.badRequest(response, [
                    'name should not be empty',
                    'email should not be empty',
                ])
            })
        })
    })

    it ('should return error message for invalid email format', () => {
        cy.request({
            method : 'POST',
            url: '/auth/register',
            body: {
                name: userData.name,
                email: 'john @ next.test',
                password: userData.password,
            },
            failOnStatusCode: false,
        }).then((response) => {
           expect(response.status).to.eq(400)
           expect(response.body.error).to.eq('Bad Request')
           expect("email must be an email").to.be.oneOf(response.body.message)
           cy.badRequest(response, ['Email must be an email'])
        })
    })

    it ('should return error message for invalid password format', () => {
        cy.request({
            method : 'POST',
            url: '/auth/register',
            body: {
                name: userData.name,
                email: userData.password,
                password: 'invalidpassword',
            },
            failOnStatusCode: false,
        }).then((response) => {
/**
           expect(response.status).to.eq(400)
           expect(response.body.error).to.eq('Bad Request')
           expect('password is not strong enough').to.be.oneOf(response.body.message)

*/
           cy.badRequest(response, ['password is not strong enough'])
        })
    })


    it ('should successfully registered', () => {
        cy.resetUsers()
        cy.request({
            method : 'POST',
            url: 'http://localhost:3000/auth/register',
            body: userData,
        }).then((response) => {
            const{id, name,email,password} = response.body.data
            expect(response.status).to.eq(201)
            expect(response.body.success).to.be.true
            expect(id).not.to.be.undefined
            expect(name.to.eq('John Doe'))
            expect(email.to.eq('john@next.test'))
            expect(password).to.be.undefined
          
        })
    })

    it ('should return error because of duplicate email', () => {
        cy.request({
            method : 'POST',
            url: 'http://localhost:3000/auth/register',
            body: userData,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(500)
            expect(response.body.success).to.be.false
            expect(response.body.message).to.eq('Email already exists')
        })
    })

})

