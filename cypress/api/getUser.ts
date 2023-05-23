export const getUserApi = {

    verifyUserNotFound: (username: string, token: string | undefined) => {
        cy.request({
            method: 'DELETE',
            url: `http://localhost:4001/users/${username}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            failOnStatusCode: false
        }).then(resp => {
            expect(resp.status).to.eq(404)
        })
    }

}