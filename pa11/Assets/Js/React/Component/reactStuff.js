(() => {
  class ReactStuff extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        originalData: props.originalData,
        studentOrProfessor: "",
        cohortNum: "",
        hasHeardOfMemes: false,
      };

      this.updateFormState = this.updateFormState.bind(this);
    }

    componentDidMount() {
      fetch(
        "https://raw.githubusercontent.com/AlignTheDeveloper/MemeData/main/memeData.json"
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
          return response.json();
        })
        .then((jsonData) => {
          console.log("Fetched data:", jsonData);
          this.setState({ originalData: jsonData });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }

    updateFormState(specification) {
      this.setState(specification);
    }

    render() {
      let filteredData = this.state.originalData;

      if (this.state.studentOrProfessor !== "") {
        filteredData = filteredData.filter(
          (row) =>
            row["Are you a student or a professor?"] ===
            this.state.studentOrProfessor
        );
      }

      if (this.state.cohortNum !== "") {
        filteredData = filteredData.filter(
          (row) =>
            row["Which cohort are you in? (For students)"] ===
            this.state.cohortNum
        );
      }

      if (this.state.hasHeardOfMemes) {
        filteredData = filteredData.filter(
          (row) => row["Have you heard about the GIMM260 Jack Memes?"] === "Yes"
        );
      }
      return (
        <React.Fragment>
          <Filters
            studentOrProfessor={this.state.studentOrProfessor}
            hasHeardOfMemes={this.state.hasHeardOfMemes}
            updateFormState={this.updateFormState}
          />
          <hr />
          <DataTable dataToDisplay={filteredData} />
          <hr />
          <DataList
            cohortNum={this.state.cohortNum}
            updateFormState={this.updateFormState}
          />
        </React.Fragment>
      );
    }
  }

  const DataTable = (props) => {
    return (
      <React.Fragment>
        <div className="table-responsive">
          <table id="table-style" className="table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Are you a student or a professor?</th>
                <th>Which cohort are you in? (For students)</th>
                <th>Have you heard about the GIMM260 Jack Memes?</th>
                <th>Do you know Professor Polifka?</th>
                <th>
                  Have any of your peers or colleagues mentioned these memes to
                  you, even if you haven't seen them?
                </th>
                <th>
                  Would you be interested in viewing these memes to provide
                  further feedback on them?
                </th>
                <th>Are you in the GIMM 260 Discord?</th>
                <th>Have you ever shared or forwarded any of these memes?</th>
                <th>Which style of meme have you encountered the most?</th>
                <th>
                  Which style of meme do you find the most amusing or
                  interesting?
                </th>
                <th>
                  Do you think these memes well represent the culture of GIMM?
                </th>
                <th>
                  Do these memes bring about a sense of unity or division among
                  students and professors, in your opinion?
                </th>
                <th>Do you believe the memes are:</th>
                <th>How do you think Jack feels about these memes?</th>
                <th>
                  Please share any additional thoughts or insights about the
                  GIMM260 Jack Memes.
                </th>
              </tr>
            </thead>
            <tbody>
              {props.dataToDisplay.map((row, i) => {
                const studentOrProfessor =
                  row["Are you a student or a professor?"];
                const cohortNum =
                  row["Which cohort are you in? (For students)"];
                const hasHeardOfMemes =
                  row["Have you heard about the GIMM260 Jack Memes?"];
                const doYouKnowJack = row["Do you know Professor Polifka?"];
                const peerMentioned =
                  row[
                    "Have any of your peers or colleagues mentioned these memes to you, even if you haven't seen them?"
                  ];
                const areYouInterested =
                  row[
                    "Would you be interested in viewing these memes to provide further feedback on them?"
                  ];
                const inClass = row["Are you in the GIMM 260 Discord?"];
                const hasShared =
                  row["Have you ever shared or forwarded any of these memes?"];
                const prominentMeme =
                  row["Which style of meme have you encountered the most?"];
                const amusingMeme =
                  row[
                    "Which style of meme do you find the most amusing or interesting?"
                  ];
                const memeCultured =
                  row[
                    "Do you think these memes well represent the culture of GIMM?"
                  ];
                const memeUnity =
                  row[
                    "Do these memes bring about a sense of unity or division among students and professors, in your opinion?"
                  ];
                const natureMeme = row["Do you believe the memes are:"];
                const jackFeels =
                  row["How do you think Jack feels about these memes?"];
                const addedThoughts =
                  row[
                    "Please share any additional thoughts or insights about the GIMM260 Jack Memes."
                  ];

                return (
                  <tr key={i}>
                    <td>{row.Timestamp}</td>
                    <td>{studentOrProfessor}</td>
                    <td>{cohortNum}</td>
                    <td>{hasHeardOfMemes}</td>
                    <td>{doYouKnowJack}</td>
                    <td>{peerMentioned}</td>
                    <td>{areYouInterested}</td>
                    <td>{inClass}</td>
                    <td>{hasShared}</td>
                    <td>{prominentMeme}</td>
                    <td>{amusingMeme}</td>
                    <td>{memeCultured}</td>
                    <td>{memeUnity}</td>
                    <td>{natureMeme}</td>
                    <td>{jackFeels}</td>
                    <td>{addedThoughts}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  };

  const Filters = (props) => {
    let updateStudentOrProfessor = (clickEvent) => {
      props.updateFormState({
        studentOrProfessor: clickEvent.target.value,
      });
    };

    let updateHasHeardOfMemes = (clickEvent) => {
      props.updateFormState({
        hasHeardOfMemes: clickEvent.target.checked,
      });
    };

    return (
      <React.Fragment>
        <h3 id="filter-header">Data Filters:</h3>
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <h5>Student Status:</h5>
            </div>
            <div className="col-md-2">
              <select onChange={updateStudentOrProfessor}>
                <option value="">&nbsp;</option>
                <option value="Student">Student</option>
                <option value="Professor">Professor</option>
              </select>
            </div>
            <div className="col-md-4"></div>
            <div className="col-md-2">
              <h5>Has Heard of the Memes </h5>
            </div>
            <div className="col-md-2">
              <input type="checkbox" onChange={updateHasHeardOfMemes} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const DataList = (props) => {
    let updateCohortNum = (event) => {
      props.updateFormState({
        cohortNum: event.target.value,
      });
    };

    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <input
                id="cohort-number"
                list="cohort-number"
                name="cohort-number"
                placeholder="Cohort"
                onChange={updateCohortNum}
              ></input>
              <datalist id="cohort-number">
                <option value="9th"></option>
                <option value="8th"></option>
                <option value="7th"></option>
                <option value="6th"></option>
                <option value="Alumni"></option>
                <option value="Professor"></option>
              </datalist>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const container = document.getElementById("react-data-table");
  const root = ReactDOM.createRoot(container);
  root.render(<ReactStuff originalData={[]} />);
})();
