import "./App.css";
import Form from "@rjsf/core";
import "bootstrap/dist/css/bootstrap.min.css";

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

function App() {
  return (
    <div className="col-md-offset-3 col-md-4">
      <Form
        schema={schema}
        uiSchema={uiSchema}
        onChange={() => console.log("changed")}
        onSubmit={(outputData) => console.log(outputData)}
        onError={() => console.log("errors")}
      ></Form>
    </div>
  );
}

export default App;
