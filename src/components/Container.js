import React, { Component } from "react";
import SearchForm from "./SearchForm";
import EmployeeCard from "./EmployeeCard";
import API from "../utils/API";
import "../styles/Result.css";

class Container extends Component {
  state = {
    result: [],
    filter: "",
    filterBy: "lastName",
    currentSort: "default",
    sortField: ""

  };

  componentDidMount() {
    API.search()
      .then(res => {
        console.log(res)
        this.setState({
          result: res.data.results.map((e, i) => ({
            firstName: e.name.first,
            lastName: e.name.last,
            picture: e.picture.large,
            email: e.email,
            phone: e.phone,
            dob: e.age,
            key: i
          }))

        })

      })
      .catch(err => console.log(err));
  }

  filterEmployees = (searchkey) => {
    console.log(searchkey);
    console.log(this.state.result);
    var filterResult = this.state.result.filter(person => person.firstName === searchkey)

    this.setState({
      result:filterResult
    })
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const value = event.target.value;
    const name = event.target.name;
    console.log(name);
    this.filterEmployees(value);
    console.log(value);
    this.setState({

      [name]: value

    });
    this.filterEmployees(value);
    this.filterEmployees(this.state.search);

  };

  handleInputChange = event => {
    event.preventDefault();
    console.log(event);
    const value = event.target.value;
    const name = event.target.name;
    console.log(value);
    console.log(name);
    this.setState({

      [name]: value

    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Employee Directory</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <SearchForm
              value={this.state.search}
               handleInputChange={this.handleInputChange}
               handleFormSubmit={this.handleFormSubmit}
            />
          </div>
        </div>

        <div className="row">
          <table className="table">
            <p>
              <th scope="col">Photo</th>
              <th>First Name</th>
              <th scope="col">Last Name </th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
            </p>
            {[...this.state.result].map((item) =>
              <EmployeeCard
                picture={item.picture}
                firstName={item.firstName}
                lastName={item.lastName}
                email={item.email}
                phone={item.phone}
                key={item.key}
              />
            )}

          </table>
        </div>


      </div>
    );
  }
}

export default Container;