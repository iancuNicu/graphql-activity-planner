import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AuthButtons from '../../presentational/auth/auth-buttons';
import AuthBody from '../../presentational/auth/auth-body';
import {Mutation} from 'react-apollo';
import {LOGIN, SIGNUP} from '../../mutations/auth-mutation';
import {withRouter} from 'react-router-dom';
import {withCookies} from  'react-cookie'

class AuthContainer extends Component {

    constructor(){
        super();
        this.state = {
            modal: false,
            email: '',
            password: '',
            type: ''
        }
    }

    handleChange = (e) => {
        const {name,value} = e.target;
        this.setState(prevState => ({
            ...prevState,
            [name]: value
        }));   
    }

    toggleModal = (inType) => {
        this.setState(prevState => ({
            ...prevState,
            modal: !prevState.modal,
            type: inType ? inType : ''
        }));
    }

    onSubmit = (e, auth) => {
        e.preventDefault();
        auth({variables: {
            user: {
                email: this.state.email,
                password: this.state.password
             }
        }}).then(async (res) => {
            console.log('Res ', res);
            this.props.cookies.set('x-auth', res.headers['x-auth']);
            this.props.cookies.set('x-auth-refresh', res.headers['x-auth-refresh']);
            this.toggleModal();
            this.props.history.push('/user-page');
        }).catch(e => {
            console.log('error ', e);
            return e;
        });
    }

    pickMutation = () => {
        const {type} = this.state;
        if(type !== ''){
            return type.includes('Login') ? LOGIN : SIGNUP;
        }
        else return SIGNUP;
    }

    render(){
        const {type, email, password} = this.state;
        const pickedMutation = this.pickMutation();

        return(
            <React.Fragment>
                <AuthButtons toggle={this.toggleModal} />
                <Mutation mutation={pickedMutation} variables={{
                        email,
                        password
                }}>
                    {
                        (auth,{data, loading, error}) => {
                            return(
                                <Modal isOpen={this.state.modal && this.state.type!==''}>
                                {type!=='' ?
                                <ModalHeader toggle={() => {this.toggleModal('')}}>{type}</ModalHeader>
                                : undefined}
                                <ModalBody>
                                        <AuthBody handleChange={this.handleChange} state={this.state} />
                                </ModalBody>  
                                <ModalFooter>
                                    <Button onClick={(e) => {
                                        this.onSubmit(e, auth)
                                    }} outline color="success">
                                            Submit
                                    </Button>         
                                </ModalFooter>  
                                </Modal>
                            )
                        }
                    }
                </Mutation>        
            </React.Fragment>
        );
    }

}

export default withRouter(withCookies(AuthContainer));