

export class AssesmentController{
    constructor({assesmentModel}){
        this.assesmentModel = assesmentModel;
    }

    getById = async (request, response) => {
        //console.log('>>>>>>> REquest session: ',request.session);
        /*const {user} = request.session;
        if(!user) return response.status(403).send('Access not Authorized');*/
        
        const {id} = request.params;

        const assesment = await this.assesmentModel.getById({id});

        if(assesment) return response.json(assesment);

        response.status(404).json({message: 'Assesment text was not found'});
    }
}