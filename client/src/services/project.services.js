import axios from 'axios'

export default class Services {

    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_URL}/projects`,
            withCredentials: true
        })
    }

    getAllProjects = () => this.service.get('/getAllProjects').then(response => response.data)
    getProjectsDetails = (id, userId) => this.service.get(`/getOneProject/${id}/${userId}`).then(response => response.data)
    postProject = project => this.service.post(`/new`, project).then(response => response.data)
    saveProject = (id, project) => this.service.put(`/save/${id}`, project).then(response => response.data)
}