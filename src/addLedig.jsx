import React, { Component } from "react";
import Form from "@rjsf/core";
import "bootstrap/dist/css/bootstrap.css"; // modern css library

const schema = {
  type: "object",
  properties: {
    listOfNumbers: {
      title: "opret ledig nummerserie",
      type: "array",
      required: ["nr_fra", "nr_til"],
      items: {
        properties: {
          nr_fra: {
            type: "string",
            pattern: "^\\d*$",
            minLength: 8,
            maxLength: 8,
          },
          nr_til: {
            type: "string",
            pattern: "^\\d*$",
            minLength: 8,
            maxLength: 8,
          },
        },
      },
    },
  },
};

const uiSchema = {
  listOfNumbers: {
    "ui:options": {
      orderable: false,
    },
    items: {
      nr_fra: {
        "ui:options": { label: false },
        "ui:placeholder": "nr fra",
      },
      nr_til: {
        "ui:options": { label: false },
        "ui:placeholder": "nr til",
      },
    },
  },
};

class AddLedig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        listOfNumbers: [
          {
            nr_fra: this.props.nr_fra.toString(),
            nr_til: this.props.nr_til.toString(),
          },
        ],
      },
    };
  }

  render() {
    return (
      <div className="col-md-offset-3 col-md-4">
        <Form
          schema={schema}
          uiSchema={uiSchema}
          formData={this.state.formData}
          onSubmit={(formOutput) => this.handleSubmit(formOutput)}
          transformErrors={transformErrors}
        ></Form>
      </div>
    );
  }

  clearForm = () => {
    this.setState({
      formData: {
        listOfNumbers: [
          {
            nr_fra: "",
            nr_til: "",
          },
        ],
      },
    });
  };

  handleSubmit = (formOutput) => {
    console.log("click");
    console.log(formOutput.formData);
    //filter and remove empty data
    var filtered = formOutput.formData.listOfNumbers.filter(function (el) {
      return el.nr_fra != null && el.nr_til != null;
    });

    //post
    console.log(filtered);
    //this.clearForm();
  };
}

function transformErrors(errors) {
  return errors.map((error) => {
    if (error.name === "pattern") {
      error.message = "Only digits are allowed";
    }
    return error;
  });
}

export default AddLedig;
