import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import Fade from "react-reveal/Fade";
import { mainState } from "../../mobx/mainState";

const Notes = observer((props) => {
  useEffect(() => {
    if (!mainState.token) go();
  }, [mainState.token]);

  useEffect(() => {
    if (mainState.token) mainState.getNotes();
  }, [mainState.token]);

  const go = () => props.transition.router.stateService.go("login");
  const date = (date) => new Date(date);

  const [input, showInput] = useState(false);
  const [inputPatch, showInputPatch] = useState(false);
  const [currentNote, setCurrentNote] = useState("");

  const handleSubmit = (e) => {
    mainState.createNote();
  };
  const handlePatchSubmit = (id) => {
    mainState.patchNote(id);
  };

  const handleTextChange = (e) => {
    mainState.handleNoteTextChange(e.target.value);
  };

  return (
    <div className="Notes">
      <Fade>
        <Card
          bg="warning"
          text="info"
          style={{ width: "25vw", height: "35vh" }}
          className="m-2"
        >
          <Card.Body>
            <Card.Text
              style={{
                color: "dimgray",
                fontSize: "18px",
                marginTop: "34%",
                cursor: "pointer",
              }}
            >
              <Form>
                {input ? (
                  <div
                    onBlur={() =>
                      setTimeout(() => {
                        showInput(false);
                      }, 300)
                    }
                  >
                    <Form.Group controlId="formBasicNoteText">
                      <Form.Control
                        as="textarea"
                        type="string"
                        onChange={handleTextChange}
                        style={{
                          height: "200px",
                          marginTop: "-30%",
                          background: "transparent",
                          border: "none",
                          boxShadow: "inherit",
                          maxHeight: "200px",
                        }}
                        autoFocus={true}
                      />
                      <Button
                        onClick={() => handleSubmit()}
                        style={{ marginTop: "3%" }}
                        variant="outline-success"
                      >
                        Создать
                      </Button>
                    </Form.Group>
                  </div>
                ) : (
                  <div onClick={() => showInput(true)}>
                    Введите текст для новой заметки
                  </div>
                )}
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
      </Fade>
      {mainState.notes ? (
        <>
          {mainState.notes.map((e) => (
            <Fade key={e.id}>
              <Card
                bg="warning"
                key={e.id}
                text="info"
                style={{ width: "25vw", height: "35vh" }}
                className="m-2"
              >
                {inputPatch && currentNote === e.id ? (
                  ""
                ) : (
                  <Card.Header>
                    <Card.Title
                      style={{
                        fontSize: "18px",
                        textAlign: "right",
                        cursor: "pointer",
                        color: "chocolate",
                      }}
                    >
                      <span onClick={() => mainState.deleteNote(e.id)}> X</span>
                    </Card.Title>
                    <Card.Subtitle
                      style={{ fontSize: "11px" }}
                      className="mt-1 mb-2 text-muted"
                    >
                      {date(e.createdAt).toDateString()}
                    </Card.Subtitle>
                    <Card.Subtitle
                      style={{ fontSize: "11px" }}
                      className="mb-2 text-muted"
                    >
                      {date(e.createdAt).toTimeString()}
                    </Card.Subtitle>
                  </Card.Header>
                )}
                <Card.Body>
                  {inputPatch && currentNote === e.id ? (
                    <div
                      onBlur={() =>
                        setTimeout(() => {
                          showInputPatch(false);
                        }, 300)
                      }
                    >
                      <Form.Group controlId="formBasicNoteText">
                        <Form.Control
                          as="textarea"
                          type="string"
                          onChange={handleTextChange}
                          style={{
                            height: "200px",
                            background: "transparent",
                            border: "none",
                            boxShadow: "inherit",
                            maxHeight: "200px",
                          }}
                          autoFocus={true}
                        />
                        <Button
                          onClick={() => handlePatchSubmit(e.id)}
                          style={{ marginTop: "3%" }}
                          variant="outline-success"
                        >
                          Изменить
                        </Button>
                      </Form.Group>
                    </div>
                  ) : (
                    <Card.Text
                      style={{
                        color: "dimgray",
                        fontSize: "18px",
                        marginTop: "6%",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setCurrentNote(e.id);
                        showInputPatch(true);
                      }}
                    >
                      {e.title}
                    </Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Fade>
          ))}
        </>
      ) : (
        "Notes not downloaded"
      )}
    </div>
  );
});

export default Notes;
