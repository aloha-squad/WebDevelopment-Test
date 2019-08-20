import React from 'react'
import './SearchContainer.css'
import { Form, FormGroup, Search, Icon } from 'carbon-components-react'
import { Search20 } from '@carbon/icons-react';

let onSubmit = (e) => {
    e.preventDefault();
    // get form data out of state
    const { search } = this.state;

    fetch('http://localhost:5000/query/cachorro' , {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(this.state)
        })
            .then((result) => result.json())
            .then((info) => { console.log(info); })
    }



export default () => 
    <div className = "searchShell">
        <div className="title">
            <h1>Qual hashtag você deseja buscar?</h1>
        </div>

        <Form className="some-class" method="GET" action="http://localhost:5000/query/">

            <FormGroup className="some-class">
                <div className="search">
                    <Search
                        className="some-class "
                        id="search"
                        placeHolderText="#Hashtag"
                    />
                    <button
                        className="some-class bx--btn bx--btn--primary bx--btn--icon-only bx--tooltip--a11y bx--tooltip--bottom bx--tooltip--align-bottom"
                        type="submit"
                        // onClick = {test()}
                        target="_blank"
                    >
                        <Search20/>
                    </button>
                </div>
            </FormGroup>
        </Form>

    </div>
