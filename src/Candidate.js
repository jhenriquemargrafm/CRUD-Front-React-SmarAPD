import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddCandidate} from './AddCandidate';
import {EditCandidate} from './EditCandidate';

export class Candidate extends Component{

    constructor(props){
        super(props);
        this.state={candidates:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'candidate')
        .then(response=>response.json())
        .then(data=>{
            this.setState({candidates:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteCandidate(candidateId){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'candidate/'+candidateId,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }

    render(){
        const {candidates, candidateId, candidateName}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Id do Candidato</th>
                            <th>Nome do Candidato</th>
                            <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map(candidate=>
                            <tr key={candidate.CandidateId}>
                                <td>{candidate.CandidateId}</td>
                                <td>{candidate.CandidateName}</td>
                                <td>
                                    <ButtonToolbar>

                                        <Button className="mr-2" variant="info"
                                            onClick={()=>this.setState({editModalShow:true,
                                                candidateId:candidate.CandidateId,
                                                candidateName:candidate.CandidateName})}>
                                            Editar
                                        </Button>

                                        <Button className="mr-2" variant="danger"
                                            onClick={()=>this.deleteCandidate(candidate.CandidateId)}>
                                            Deletar
                                        </Button>

                                        <EditCandidate show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            candidateId={candidateId}
                                            candidateName={candidateName}/>

                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant='primary'
                        onClick={()=>this.setState({addModalShow:true})}>
                        Adicionar Candidato
                    </Button>
                    <AddCandidate show={this.state.addModalShow}
                        onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}