import axios from 'axios'

export default class Services {

    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_URL}/`,
            withCredentials: true
        })
    }

    getAllProjects = () => this.service.get('/getAllProjects').then(response => response.data)
    getProjectsDetails = id => this.service.get(`/getOneProject/${id}`).then(response => response.data)
    postProject = project => this.service.post(`/new`, project).then(response => response.data)
}