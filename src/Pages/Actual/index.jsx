import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import NavHheader from "../../Components/NavHeader";
//Setting the use history hook
import { useLocation, useHistory } from 'react-router-dom';

//Importing Firebase 
import firebase from "../../firebase";
import 'firebase/firestore';
import 'firebase/auth';

import "./style.scss";

const Actual = () => {
    const [availableOptions, setAvailableOptions] = useState(['Cash - Operating Account',
        'Cash - Payroll Account',
        'Cash - Money Market Account',
        'Cash - User Defined1',
        'Cash - User Defined2',
        'Cash - User Defined3',
        'Cash - Petty Cash']);

    const [labels, setLabels] = useState([]);

    const [currentLabel, setCurrentLabel] = useState("");

    const [currentOption, setCurrentOption] = useState("");
    const [option, setOption] = useState("");

    //The debit state
    const [debit, setDebit] = useState(0);
    const [credit, setCredit] = useState(0);

    //Available Debits
    const [availableDebits, setAvailableDebits] = useState([]);
    const [availableCredits, setAvailableCredits] = useState([]);

    const history = useHistory();
    // const location = useLocation();
    // const { pathname } = location;
    useEffect(() => {
        const label = ["A", "B", "C", "D", "E", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
        setLabels(label);
        //////////////////////////////////////////////////////////////////////////////////////////Retreiving firebase data from web
        // Now retreiving the data
        //////////////////////////////Here all data retreiving is working////////////////////////////
        // const db = firebase.firestore();
        // //Data Retreiving for Auth
        // db.collection(`Languages`)
        //     .get()
        //     .then(snapshot => {
        //         let data = [];
        //         snapshot.forEach(element => {
        //             data.push(Object.assign({
        //                 "id": element.id,
        //                 "translation": element.translation
        //             }, element.data()))
        //         })

        //         const language_array = [];

        //         for (let i = 0; i < data.length; i++) {
        //             //console.log(data[i].translation.description.short_name);
        //             let language_label = data[i].translation.description.short_name;
        //             language_array.push(language_label);
        //         }
        //         console.log(language_array);
        //         console.log(`data for current selected user `, convertArrayToObject(data, 1));
        //     })
        //////////////////////////////////////////////////////////////////////////////////////////Retreiving firebase data from web
    }, [])

    const pushAvailableOptions = () => {
        //Either I have to insert the new element or not.I will check if already a option present it cant be inserted again.
        let insert = true;
        for (let i = 0; i < availableOptions.length; i++) {
            if (option == availableOptions[i]) {
                insert = false;
                break;
            }
        }
        if (!insert) {
            alert(`Please insert a Unique Value. '${option}' is already present.`);
        }
        if (option != "" && insert == true) {
            setAvailableOptions([...availableOptions, option]);
            setOption("");
        }
        if (option == "") {
            alert("Please enter any text to submit!");
        }
    }

    const pushAvailableDebits = () => {
        if (debit != 0 && currentOption != "") {
            let obj = {
                selectedOption: currentOption,
                Debit: debit,
                Label: currentLabel
            }
            setAvailableDebits([...availableDebits, obj]);
            setDebit(0);
        }
        if (debit == 0) {
            alert("Please enter any debit value to submit!");
        }
        if (currentOption == "") {
            alert("Please select an option also from the above drop down to submit debit value.")
        }
        if (currentLabel == "") {
            alert("Please select a Label from the Menu to Submit the value.")
        }
    }

    const pushAvailableCredits = () => {
        if (credit != 0 && currentOption != "") {
            let obj = {
                selectedOption: currentOption,
                Credit: credit,
                Label: currentLabel
            }
            setAvailableCredits([...availableCredits, obj]);
            setCredit(0);
        }
        if (credit == 0) {
            alert("Please enter any Credit value to submit!");
        }
        if (currentOption == "") {
            alert("Please select an option also from the above drop down to submit Credit value.")
        }
        if (currentLabel == "") {
            alert("Please select a Label from the Menu to Submit the value.")
        }
    }

    function arrayRemove(arr, value) {
        return arr.filter(function (ele) {
            return ele != value;
        });
    }

    const deleteItem = (key) => {
        // alert(key);
        let arr = availableOptions;
        //arr.splice(key, 1);
        let value = arr[key];
        //setAvailableOptions([]);
        //const new_arr = arr;
        var result = arrayRemove(arr, value);
        console.log("Available Options is : ", result);
        setAvailableOptions(result);
        // if (window.confirm(`Are you sure you want to delete the element ${availableOptions[key]} at number ${key + 1}`)) {
        //     condition = true;
        //     console.log("Available Options is : ", arr);
        // } else {
        //     console.log("User canceled deletion!");
        // }
    }

    return (
        <>
            <Header />
            <NavHheader />
            <br />
            <div className="container-own">
                <div className="row">
                    <div>
                        {/* Tabs navs */}
                        <ul className="nav nav-tabs nav-justified mb-3" id="ex1" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a className="nav-link active" id="ex3-tab-1" data-mdb-toggle="tab" href="#ex3-tabs-1" role="tab" aria-controls="ex3-tabs-1" aria-selected="true">Add Values</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a className="nav-link" id="ex3-tab-2" data-mdb-toggle="tab" href="#ex3-tabs-2" role="tab" aria-controls="ex3-tabs-2" aria-selected="false">Calculate</a>
                            </li>
                        </ul>
                        {/* Tabs navs */}
                        {/* Tabs content */}
                        <div className="tab-content" id="ex2-content">
                            <div className="tab-pane fade show active container border" id="ex3-tabs-1" role="tabpanel" aria-labelledby="ex3-tab-1">
                                <h3 className="text-warning mt-3 mb-3">Enter the Value for the drop down : -</h3>
                                {/* The Drop down for selecting the option  */}
                                <input placeholder="Enter any text eg: 'A value' " className="form-control txt-field" value={option} onChange={(e) => setOption(e.target.value)} type="text" />
                                <br />
                                <button className="btn btn-primary btn-lg btn-push" onClick={() => pushAvailableOptions()}>Add</button>
                                <br />
                                <br />

                                {(availableOptions == "") ? (
                                    <h4 className="text-danger mb-4">Currently there are no values in drop down.Enter any value to be appeared in dropdown.</h4>
                                ) : (
                                    <div className="table-responsive container">
                                        <table className="table table-bordered">
                                            {
                                                availableOptions.map((v, i) => {
                                                    return <tbody key={i}>
                                                        {(i == 0) ? (
                                                            <tr>
                                                                <th>
                                                                    <h3>#</h3>
                                                                </th>
                                                                <th>
                                                                    <h4 className="text-success">DropDown Values</h4>
                                                                </th>
                                                                <th>
                                                                    <h4 className="text-warning">EDIT</h4>
                                                                </th>
                                                                <th>
                                                                    <h4 className="text-danger">
                                                                        Delete
                                                                    </h4>
                                                                </th>
                                                            </tr>
                                                        ) : (
                                                            <></>
                                                        )}

                                                        <tr>
                                                            <td>
                                                                <h4>{i + 1})</h4>
                                                            </td>
                                                            <td><h3>{v}</h3></td>
                                                            <td>
                                                                <button className="btn btn-warning">Edit</button>
                                                            </td>
                                                            <td>
                                                                <button onClick={() => deleteItem(i)} className="btn btn-danger">Delete</button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                })
                                            }
                                        </table>
                                    </div>
                                )}
                                {/* The Drop down for selecting the option */}
                            </div>
                            <div className="tab-pane fade" id="ex3-tabs-2" role="tabpanel" aria-labelledby="ex3-tab-2">
                                <div className="container">
                                    <div className="row">
                                        <div className="container">
                                            <br />
                                            <h4 className="text-dark text-head">Select the account name from the drop down list located below
                                                <p className="text-danger text-bold text-center mt-4"> <b>OR</b></p> Input desired account names by navigating to the Add Values Tab located on the left side bar:
                                                {/* :  <span className="text-danger ml-4">*</span></h4> */}
                                            </h4>
                                            <div title="Select the account name from the drop down list located below" className="input-group input-group-md txt-field">
                                                <span className="input-group-addon glyphicon glyphicon-search" id="sizing-addon2"></span>
                                                <select style={{ fontSize: "18px", width: "200px", height: "40px" }} value={currentOption}
                                                    onChange={(e) => setCurrentOption(e.target.value)} className="form-control">
                                                    {["No Selected Value", ...availableOptions].map((v, i) => {
                                                        return <option value={v} key={i}>
                                                            {v}
                                                        </option>
                                                    })}
                                                </select>
                                            </div>

                                            <br />


                                            <h4 className="text-primary text-bold">
                                                Select the label you want to insert with the value :
                                            </h4>

                                            <div className="input-group input-group-md txt-field">
                                                <span className="input-group-addon glyphicon glyphicon-search" id="sizing-addon2"></span>
                                                <select style={{ fontSize: "18px", width: "200px", color: "blue" }} value={currentLabel}
                                                    onChange={(e) => setCurrentLabel(e.target.value)} className="form-control">
                                                    {["No Selected Label", ...labels].map((v, i) => {
                                                        return <option value={v} key={i}>
                                                            {v}
                                                        </option>
                                                    })}
                                                </select>
                                            </div>

                                            <br />
                                            <br />

                                        </div>

                                        <hr />

                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <h3 className="text-primary mt-3 mb-3">Debit Amount : -</h3>
                                                    {/* The Drop down for selecting the option  */}
                                                    <input type="number" placeholder="Enter any debit amount eg: '100' " className="form-control txt-field" value={debit} onChange={(e) => setDebit(e.target.value)} />
                                                    <br />
                                                    <button className="btn btn-primary btn-push" onClick={() => pushAvailableDebits()}>Add Debit Amount</button>
                                                    <br />
                                                    <br />
                                                </div>
                                                <div className="col-md-6">
                                                    <h3 className="text-primary mt-3 mb-3">Credit Amount : -</h3>
                                                    {/* The Drop down for selecting the option  */}
                                                    <input type="number" placeholder="Enter any credit amount eg: '10' " className="form-control txt-field" value={credit} onChange={(e) => setCredit(e.target.value)} />
                                                    <br />
                                                    <button className="btn btn-primary btn-push" onClick={() => pushAvailableCredits()}>Add Credit Amount</button>
                                                    <br />
                                                    <br />
                                                </div>
                                            </div>
                                        </div>

                                        <br />

                                        <div className="container">
                                            <div className="border w-fit-content">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="input-group input-group-md category_select txt-field">
                                                            <span className="input-group-addon glyphicon glyphicon-search"></span>
                                                            <select id="Table-DropDown" value={currentOption}
                                                                onChange={(e) => setCurrentOption(e.target.value)} className="form-control">
                                                                {["No Selected Value", ...availableOptions].map((v, i) => {
                                                                    return <option value={v} key={i}>
                                                                        {v}
                                                                    </option>
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="table">
                                                            <table className="table table-hover">
                                                                <thead>
                                                                    <tr>
                                                                        <th colSpan={3}>
                                                                            <h5 className="text-bold"><i className="fas fa-list-alt fa-lg mr-3 text-success"></i>&nbsp;&nbsp; Debit Card</h5>
                                                                            <h6><span className="text-success">The amount in Credit Card in different sections</span> </h6>
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="col"> <p> <b>Label</b></p> </th>
                                                                        <th scope="col"> <p><b>Amounts</b></p></th>
                                                                        <th scope="col"> <p><b>Edit</b></p> </th>
                                                                    </tr>
                                                                </thead>
                                                                <>

                                                                    <tbody>

                                                                        {(availableDebits.length == 0) ? (
                                                                            <tr>
                                                                                <th scope="row">No Label</th>
                                                                                <th scope="row" >No Value</th>
                                                                                <th scope="row"><button className="btn btn-warning btn-sm" disabled={true}>E</button></th>
                                                                            </tr>
                                                                        ) : (
                                                                            availableDebits.map((v, j) => {
                                                                                return <tr key={j}>

                                                                                    <>
                                                                                        <th scope="row" className="text-center w-fit-content text-bold mt-3"><h6 className="text-bold">{v.Label}</h6></th>

                                                                                        <td>
                                                                                            <h6 className="text-success mt-2 text-center text-bold">{v.Debit}</h6>
                                                                                        </td>

                                                                                        <td className="text-center"><button type="button" className="btn btn-warning btn-sm">E</button></td>
                                                                                    </>

                                                                                </tr>
                                                                            })
                                                                        )}
                                                                    </tbody>
                                                                    {/* This matters */}
                                                                </>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="table">
                                                            <table className="table table-hover">
                                                                <thead>
                                                                    <tr>
                                                                        <th colSpan={3}>
                                                                            <h5 className="text-bold"><i className="fas fa-list-alt fa-lg mr-3 text-danger"></i>&nbsp;&nbsp; Credit Card</h5>
                                                                            <h6><span className="text-danger">The amount in Credit Card in different sections</span> </h6>
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="col"> <p> <b>Label</b></p> </th>
                                                                        <th scope="col"> <p><b>Amounts</b></p></th>
                                                                        <th scope="col"> <p><b>Edit</b></p> </th>
                                                                    </tr>
                                                                </thead>
                                                                <>

                                                                    <tbody>

                                                                        {(availableDebits.length == 0) ? (
                                                                            <tr>
                                                                                <th scope="row">No Label</th>
                                                                                <th scope="row" >No Value</th>
                                                                                <th scope="row"><button className="btn btn-warning btn-sm" disabled={true}>E</button></th>
                                                                            </tr>
                                                                        ) : (
                                                                            availableDebits.map((v, j) => {
                                                                                return <tr key={j}>

                                                                                    <>
                                                                                        <th scope="row" className="text-center w-fit-content text-bold mt-3"><h6 className="text-bold">{v.Label}</h6></th>

                                                                                        <td>
                                                                                            <h6 className="text-success mt-2 text-center text-bold">{v.Debit}</h6>
                                                                                        </td>

                                                                                        <td className="text-center"><button type="button" className="btn btn-warning btn-sm">E</button></td>
                                                                                    </>

                                                                                </tr>
                                                                            })
                                                                        )}
                                                                    </tbody>
                                                                    {/* This matters */}
                                                                </>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Tabs content */}
                    </div>
                </div>
            </div >
            <br />
            <br />
        </>
    )
}
export default Actual;