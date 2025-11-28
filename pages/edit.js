import React, { useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "next-themes";

// Data
import yourData from "../data/portfolio.json";
import Cursor from "../components/Cursor";

const Edit = () => {
  // states
  const [data, setData] = useState(yourData);
  const [currentTabs, setCurrentTabs] = useState("HEADER");
  const { theme } = useTheme();

  const saveData = () => {
    if (process.env.NODE_ENV === "development") {
      fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } else {
      alert("This thing only works in development mode.");
    }
  };

  // Project Handler
  const editProjects = (projectIndex, editProject) => {
    let copyProjects = data.projects;
    copyProjects[projectIndex] = { ...editProject };
    setData({ ...data, projects: copyProjects });
  };

  const addProject = () => {
    setData({
      ...data,
      projects: [
        ...data.projects,
        {
          id: uuidv4(),
          title: "New Project",
          description: "Web Design & Development",
          imageSrc:
            "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTAyfHxwYXN0ZWx8ZW58MHx8MHw%3D&auto=format&fit=crop&w=400&q=60",

          url: "http://chetanverma.com/",
        },
      ],
    });
  };

  const deleteProject = (id) => {
    const copyProjects = data.projects;
    copyProjects = copyProjects.filter((project) => project.id !== id);
    setData({ ...data, projects: copyProjects });
  };

  // Activities Handler

  const editActivities = (activityIndex, editActivity) => {
    let copyActivities = data.activities;
    copyActivities[activityIndex] = { ...editActivity };
    setData({ ...data, activities: copyActivities });
  };

  const addActivity = () => {
    setData({
      ...data,
      activities: [
        ...data.activities,
        {
          id: uuidv4(),
          title: "New Activity",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
          image: "https://via.placeholder.com/400",
          date: "2024-01-01",
          link: "https://example.com",
        },
      ],
    });
  };

  const deleteActivity = (id) => {
    let copyActivities = data.activities;
    copyActivities = copyActivities.filter((activity) => activity.id !== id);
    setData({ ...data, activities: copyActivities });
  };

  // Socials Handler

  const editSocials = (socialIndex, editSocial) => {
    let copySocials = data.socials;
    copySocials[socialIndex] = { ...editSocial };
    setData({ ...data, socials: copySocials });
  };

  const addSocials = () => {
    setData({
      ...data,
      socials: [
        ...data.socials,
        {
          id: uuidv4(),
          title: "New Link",
          link: "www.chetanverma.com",
        },
      ],
    });
  };

  const deleteSocials = (id) => {
    const copySocials = data.socials;
    copySocials = copySocials.filter((social) => social.id !== id);
    setData({ ...data, socials: copySocials });
  };

  // Resume

  const handleAddExperiences = () => {
    setData({
      ...data,
      resume: {
        ...data.resume,
        experiences: [
          ...data.resume.experiences,
          {
            id: uuidv4(),
            dates: "Enter Dates",
            type: "Full Time",
            position: "Frontend Engineer at X",
            bullets: ["Worked on the frontend of a React application"],
          },
        ],
      },
    });
  };

  const handleEditExperiences = (index, editExperience) => {
    let copyExperiences = data.resume.experiences;
    copyExperiences[index] = { ...editExperience };
    setData({
      ...data,
      resume: { ...data.resume, experiences: copyExperiences },
    });
  };

  // Activity Handlers
  const handleAddActivity = () => {
    setData({
      ...data,
      resume: {
        ...data.resume,
        activities: [
          ...data.resume.activities,
          {
            id: uuidv4(),
            dates: "Enter Dates",
            type: "Activity Type",
            position: "Activity Position",
            bullets: [], // Initialize as an empty array
            link: "Activity link",
          },
        ],
      },
    });
  };

  const handleEditActivity = (index, editActivity) => {
    let copyActivities = data.resume.activities;
    copyActivities[index] = { ...editActivity };
    setData({
      ...data,
      resume: { ...data.resume, activities: copyActivities },
    });
  };

  const handleDeleteActivity = (id) => {
    const updatedActivities = data.resume.activities.filter(
      (activity) => activity.id !== id
    );
    setData({
      ...data,
      resume: { ...data.resume, activities: updatedActivities },
    });
  };

  return (
    <div className={`container mx-auto ${data.showCursor && "cursor-none"}`}>
      <Header isBlog></Header>
      {data.showCursor && <Cursor />}
      <div className="mt-10">
        <div className={`${theme === "dark" ? "bg-transparent" : "bg-white"}`}>
          <div className="flex items-center justify-between">
            <h1 className="text-4xl">Dashboard</h1>
            <div className="flex items-center">
              <Button onClick={saveData} type="primary">
                Save
              </Button>
            </div>
          </div>

          <div className="flex items-center">
            <Button
              onClick={() => setCurrentTabs("HEADER")}
              type={currentTabs === "HEADER" && "primary"}
            >
              Header
            </Button>
            <Button
              onClick={() => setCurrentTabs("PROJECTS")}
              type={currentTabs === "PROJECTS" && "primary"}
            >
              Projects
            </Button>
            <Button
              onClick={() => setCurrentTabs("ACTIVITIES")}
              type={currentTabs === "ACTIVITIES" && "primary"}
            >
              Activities
            </Button>
            <Button
              onClick={() => setCurrentTabs("ABOUT")}
              type={currentTabs === "ABOUT" && "primary"}
            >
              About
            </Button>
            <Button
              onClick={() => setCurrentTabs("SOCIAL")}
              type={currentTabs === "SOCIAL" && "primary"}
            >
              Social
            </Button>
            <Button
              onClick={() => setCurrentTabs("RESUME")}
              type={currentTabs === "RESUME" && "primary"}
            >
              Resume
            </Button>
          </div>
        </div>
        {/* HEADER */}
        {currentTabs === "HEADER" && (
          <div className="mt-10">
            <div className="flex items-center">
              <label className="w-1/5 text-lg opacity-50">Name</label>
              <input
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                type="text"
              ></input>
            </div>
            <div className="mt-5 flex items-center">
              <label className="w-1/5 text-sx opacity-50">
                Header Tagline One
              </label>
              <input
                value={data.headerTaglineOne}
                onChange={(e) =>
                  setData({ ...data, headerTaglineOne: e.target.value })
                }
                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                type="text"
              ></input>
            </div>
            <div className="mt-5 flex items-center">
              <label className="w-1/5 text-lg opacity-50">
                Header Tagline Two
              </label>
              <input
                value={data.headerTaglineTwo}
                onChange={(e) =>
                  setData({ ...data, headerTaglineTwo: e.target.value })
                }
                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                type="text"
              ></input>
            </div>
            <div className="mt-5 flex items-center">
              <label className="w-1/5 text-lg opacity-50">
                Header Tagline Three
              </label>
              <input
                value={data.headerTaglineThree}
                onChange={(e) =>
                  setData({ ...data, headerTaglineThree: e.target.value })
                }
                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                type="text"
              ></input>
            </div>
            <div className="mt-5 flex items-center">
              <label className="w-1/5 text-lg opacity-50">
                Header Tagline Four
              </label>
              <input
                value={data.headerTaglineFour}
                onChange={(e) =>
                  setData({ ...data, headerTaglineFour: e.target.value })
                }
                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                type="text"
              ></input>
            </div>
            <div className="mt-5 flex items-center">
              <label className="w-1/5 text-lg opacity-50">Blog</label>
              <div className="w-4/5 ml-10 flex items-center">
                <Button
                  onClick={() => setData({ ...data, showBlog: true })}
                  type={data.showBlog && "primary"}
                >
                  Yes
                </Button>
                <Button
                  onClick={() => setData({ ...data, showBlog: false })}
                  classes={
                    !data.showBlog && "bg-red-500 text-white hover:bg-red-600"
                  }
                >
                  No
                </Button>
              </div>
            </div>
            <div className="mt-5 flex items-center">
              <label className="w-1/5 text-lg opacity-50">Dark Mode</label>
              <div className="w-4/5 ml-10 flex items-center">
                <Button
                  onClick={() => setData({ ...data, darkMode: true })}
                  type={data.darkMode && "primary"}
                >
                  Yes
                </Button>
                <Button
                  onClick={() => setData({ ...data, darkMode: false })}
                  classes={
                    !data.darkMode && "bg-red-500 text-white hover:bg-red-600"
                  }
                >
                  No
                </Button>
              </div>
            </div>
            <div className="mt-5 flex items-center">
              <label className="w-1/5 text-lg opacity-50">Show Resume</label>
              <div className="w-4/5 ml-10 flex items-center">
                <Button
                  onClick={() => setData({ ...data, showResume: true })}
                  type={data.showResume && "primary"}
                >
                  Yes
                </Button>
                <Button
                  onClick={() => setData({ ...data, showResume: false })}
                  classes={
                    !data.showResume && "bg-red-500 text-white hover:bg-red-600"
                  }
                >
                  No
                </Button>
              </div>
            </div>
            <div className="mt-5 flex items-center">
              <label className="w-1/5 text-lg opacity-50">Custom Cursor</label>
              <div className="w-4/5 ml-10 flex items-center">
                <Button
                  onClick={() => setData({ ...data, showCursor: true })}
                  type={data.showCursor && "primary"}
                >
                  Yes
                </Button>
                <Button
                  onClick={() => setData({ ...data, showCursor: false })}
                  classes={
                    !data.showCursor && "bg-red-500 text-white hover:bg-red-600"
                  }
                >
                  No
                </Button>
              </div>
            </div>
          </div>
        )}
        {/* PROJECTS */}
        {currentTabs === "PROJECTS" && (
          <>
            <div className="mt-10">
              {data.projects.map((project, index) => (
                <div className="mt-10" key={project.id}>
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl">{project.title}</h1>
                    <Button
                      onClick={() => deleteProject(project.id)}
                      type="primary"
                    >
                      Delete
                    </Button>
                  </div>

                  <div className="flex items-center mt-5">
                    <label className="w-1/5 text-lg opacity-50">Title</label>
                    <input
                      value={project.title}
                      onChange={(e) =>
                        editProjects(index, {
                          ...project,
                          title: e.target.value,
                        })
                      }
                      className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                      type="text"
                    ></input>
                  </div>
                  <div className="flex items-center mt-2">
                    <label className="w-1/5 text-lg opacity-50">
                      Description
                    </label>
                    <input
                      value={project.description}
                      onChange={(e) =>
                        editProjects(index, {
                          ...project,
                          description: e.target.value,
                        })
                      }
                      className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                      type="text"
                    ></input>
                  </div>
                  <div className="flex items-center mt-2">
                    <label className="w-1/5 text-lg opacity-50">
                      Image Source
                    </label>
                    <input
                      value={project.imageSrc}
                      onChange={(e) =>
                        editProjects(index, {
                          ...project,
                          imageSrc: e.target.value,
                        })
                      }
                      className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                      type="text"
                    ></input>
                  </div>
                  <div className="flex items-center mt-2">
                    <label className="w-1/5 text-lg opacity-50">url</label>
                    <input
                      value={project.url}
                      onChange={(e) =>
                        editProjects(index, {
                          ...project,
                          url: e.target.value,
                        })
                      }
                      className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                      type="text"
                    ></input>
                  </div>
                  <div className="flex items-center mt-2">
                    <label className="w-1/5 text-lg opacity-50">Github</label>
                    <input
                      value={project.github}
                      onChange={(e) =>
                        editProjects(index, {
                          ...project,
                          github: e.target.value,
                        })
                      }
                      className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                      type="text"
                    ></input>
                  </div>
                  <hr className="my-10"></hr>
                </div>
              ))}
            </div>

            <div className="my-10">
              <Button onClick={addProject} type="primary">
                Add Project +
              </Button>
            </div>
          </>
        )}
        {/* ACTIVITIES */}
        {currentTabs === "ACTIVITIES" && (
          <>
            <div className="mt-10">
              {data.activities.map((activity, index) => (
                <div key={activity.id}>
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl">{activity.title}</h1>
                    <Button
                      onClick={() => deleteActivity(activity.id)}
                      type="primary"
                    >
                      Delete
                    </Button>
                  </div>
                  <div className="flex items-center mt-5">
                    <label className="w-1/5 text-lg opacity-50">Title</label>
                    <input
                      value={activity.title}
                      onChange={(e) =>
                        editActivities(index, {
                          ...activity,
                          title: e.target.value,
                        })
                      }
                      className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                      type="text"
                    ></input>
                  </div>
                  <div className="flex items-center mt-5">
                    <label className="w-1/5 text-lg opacity-50">
                      Description
                    </label>
                    <textarea
                      value={activity.description}
                      onChange={(e) =>
                        editActivities(index, {
                          ...activity,
                          description: e.target.value,
                        })
                      }
                      className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                    ></textarea>
                  </div>
                  <div className="flex items-center mt-5">
                    <label className="w-1/5 text-lg opacity-50">Image</label>
                    <input
                      value={activity.image}
                      onChange={(e) =>
                        editActivities(index, {
                          ...activity,
                          image: e.target.value,
                        })
                      }
                      className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                      type="text"
                    ></input>
                  </div>
                  <div className="flex items-center mt-5">
                    <label className="w-1/5 text-lg opacity-50">Date</label>
                    <input
                      value={activity.date}
                      onChange={(e) =>
                        editActivities(index, {
                          ...activity,
                          date: e.target.value,
                        })
                      }
                      className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                      type="text"
                    ></input>
                  </div>
                  <div className="flex items-center mt-5">
                    <label className="w-1/5 text-lg opacity-50">Link</label>
                    <input
                      value={activity.link}
                      onChange={(e) =>
                        editActivities(index, {
                          ...activity,
                          link: e.target.value,
                        })
                      }
                      className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                      type="text"
                    ></input>
                  </div>
                  <hr className="my-10"></hr>
                </div>
              ))}
            </div>
            <div className="my-10">
              <Button onClick={addActivity} type="primary">
                Add Activity +
              </Button>
            </div>
          </>
        )}
        {currentTabs === "ABOUT" && (
          <div className="mt-10">
            <h1 className="text-2xl">About</h1>
            <div className="flex items-center mt-5">
              <label className="w-1/5 text-lg opacity-50">About Text</label>
              <textarea
                className="w-4/5 ml-10 h-48 p-2 rounded-md shadow-lg border-2"
                value={data.aboutpara || ""}
                onChange={(e) =>
                  setData({ ...data, aboutpara: e.target.value })
                }
                placeholder="Write your about text here (optional)"
              ></textarea>
            </div>
            <div className="flex items-center mt-5">
              <label className="w-1/5 text-lg opacity-50">Quote</label>
              <input
                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                value={data.aboutquote || ""}
                onChange={(e) =>
                  setData({ ...data, aboutquote: e.target.value })
                }
                type="text"
                placeholder="Add an optional quote"
              />
            </div>
          </div>
        )}
        {currentTabs === "SOCIAL" && (
          <div className="mt-10">
            {data.socials.map((social, index) => (
              <>
                <div key={social.id}>
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl">{social.title}</h1>
                    <Button
                      onClick={() => deleteSocials(social.id)}
                      type="primary"
                    >
                      Delete
                    </Button>
                  </div>
                  <div className="flex items-center mt-5">
                    <label className="w-1/5 text-lg opacity-50">Title</label>
                    <input
                      value={social.title}
                      onChange={(e) =>
                        editSocials(index, {
                          ...social,
                          title: e.target.value,
                        })
                      }
                      className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                      type="text"
                    ></input>
                  </div>
                  <div className="flex items-center mt-5">
                    <label className="w-1/5 text-lg opacity-50">Link</label>
                    <input
                      value={social.link}
                      onChange={(e) =>
                        editSocials(index, {
                          ...social,
                          link: e.target.value,
                        })
                      }
                      className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                      type="text"
                    />
                  </div>
                  <div className="flex items-center mt-5">
                    <label className="w-1/5 text-lg opacity-50">Logo</label>
                    <input
                      value={social.logo || ""}
                      onChange={(e) =>
                        editSocials(index, {
                          ...social,
                          logo: e.target.value,
                        })
                      }
                      className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                      type="text"
                      placeholder="Logo URL"
                    />
                  </div>
                  <hr className="my-10"></hr>
                </div>
              </>
            ))}
            <div className="my-10">
              <Button onClick={addSocials} type="primary">
                Add Social +
              </Button>
            </div>
          </div>
        )}
        {currentTabs === "RESUME" && (
          <div className="mt-10">
            <h1>Main</h1>
            <div className="mt-5 flex items-center">
              <label className="w-1/5 text-sx opacity-50">Tagline</label>
              <input
                value={data.resume.tagline}
                onChange={(e) =>
                  setData({
                    ...data,
                    resume: { ...data.resume, tagline: e.target.value },
                  })
                }
                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                type="text"
              ></input>
            </div>
            <div className="flex items-center mt-5">
              <label className="w-1/5 text-lg opacity-50">Description</label>
              <textarea
                value={data.resume.description}
                onChange={(e) =>
                  setData({
                    ...data,
                    resume: { ...data.resume, description: e.target.value },
                  })
                }
                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
              ></textarea>
            </div>
            <hr className="my-10"></hr>

            <h1>Experiences</h1>
            <div className="mt-10">
              {data.resume.experiences.map((experiences, index) => (
                <div className="mt-5" key={experiences.id}>
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl">{experiences.position}</h1>
                    <Button
                      // onClick={() => deleteProject(project.id)}
                      type="primary"
                    >
                      Delete
                    </Button>
                  </div>

                  <div className="flex items-center mt-5">
                    <label className="w-1/5 text-lg opacity-50">Dates</label>
                    <input
                      value={experiences.dates}
                      onChange={(e) =>
                        handleEditExperiences(index, {
                          ...experiences,
                          dates: e.target.value,
                        })
                      }
                      className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                      type="text"
                    ></input>
                  </div>
                  <div className="flex items-center mt-2">
                    <label className="w-1/5 text-lg opacity-50">Type</label>
                    <input
                      value={experiences.type}
                      onChange={(e) =>
                        handleEditExperiences(index, {
                          ...experiences,
                          type: e.target.value,
                        })
                      }
                      className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                      type="text"
                    ></input>
                  </div>
                  <div className="flex items-center mt-2">
                    <label className="w-1/5 text-lg opacity-50">Position</label>
                    <input
                      value={experiences.position}
                      onChange={(e) =>
                        handleEditExperiences(index, {
                          ...experiences,
                          position: e.target.value,
                        })
                      }
                      className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                      type="text"
                    ></input>
                  </div>
                  <div className="mt-2 flex">
                    <label className="w-1/5 text-lg opacity-50">Bullets</label>
                    <div className="w-4/5 ml-10 flex flex-col">
                      <input
                        value={experiences.bullets}
                        onChange={(e) =>
                          handleEditExperiences(index, {
                            ...experiences,
                            bullets: e.target.value,
                          })
                        }
                        placeholder="Bullet One, Bullet Two, Bullet Three"
                        className="p-2 rounded-md shadow-lg border-2"
                        type="text"
                      ></input>
                    </div>
                  </div>
                  <div className="mt-2 flex">
                    <label className="w-1/5 text-lg opacity-50">Link</label>
                    <div className="w-4/5 ml-10 flex flex-col">
                      <input
                        value={experiences.link}
                        onChange={(e) =>
                          handleEditExperiences(index, {
                            ...experiences,
                            link: e.target.value,
                          })
                        }
                        placeholder="link to show work"
                        className="p-2 rounded-md shadow-lg border-2"
                        type="text"
                      ></input>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="my-10">
              <Button onClick={handleAddExperiences} type="primary">
                Add Experience +
              </Button>
            </div>
            <hr className="my-10"></hr>
            <div className="mt-10">
              <h1>Education</h1>
              <div className="flex items-center mt-5">
                <label className="w-1/5 text-lg opacity-50">Name</label>
                <input
                  value={data.resume.education.universityName}
                  onChange={(e) =>
                    setData({
                      ...data,
                      resume: {
                        ...data.resume,
                        education: {
                          ...data.resume.education,
                          universityName: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                  type="text"
                ></input>
              </div>
              <div className="flex items-center mt-5">
                <label className="w-1/5 text-lg opacity-50">Dates</label>
                <input
                  value={data.resume.education.universityDate}
                  onChange={(e) =>
                    setData({
                      ...data,
                      resume: {
                        ...data.resume,
                        education: {
                          ...data.resume.education,
                          universityDate: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                  type="text"
                ></input>
              </div>
              <div className="flex items-center mt-5">
                <label className="w-1/5 text-lg opacity-50">Detail</label>
                <input
                  value={data.resume.education.universityPara}
                  onChange={(e) =>
                    setData({
                      ...data,
                      resume: {
                        ...data.resume,
                        education: {
                          ...data.resume.education,
                          universityPara: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                  type="text"
                ></input>
              </div>
            </div>

            <hr className="my-10"></hr>
            <div className="mt-10">
              <h1>Activities</h1>
              <div className="mt-10">
                {data.resume.activities.map((activity, index) => (
                  <div className="mt-5" key={activity.id}>
                    <div className="flex items-center justify-between">
                      <h1 className="text-2xl">{activity.position}</h1>
                      <Button
                        onClick={() => handleDeleteActivity(activity.id)}
                        type="primary"
                      >
                        Delete
                      </Button>
                    </div>

                    <div className="flex items-center mt-5">
                      <label className="w-1/5 text-lg opacity-50">Dates</label>
                      <input
                        value={activity.dates}
                        onChange={(e) =>
                          handleEditActivity(index, {
                            ...activity,
                            dates: e.target.value,
                          })
                        }
                        className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                        type="text"
                      />
                    </div>

                    <div className="flex items-center mt-2">
                      <label className="w-1/5 text-lg opacity-50">Type</label>
                      <input
                        value={activity.type}
                        onChange={(e) =>
                          handleEditActivity(index, {
                            ...activity,
                            type: e.target.value,
                          })
                        }
                        className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                        type="text"
                      />
                    </div>

                    <div className="flex items-center mt-2">
                      <label className="w-1/5 text-lg opacity-50">
                        Name of Activity
                      </label>
                      <input
                        value={activity.position}
                        onChange={(e) =>
                          handleEditActivity(index, {
                            ...activity,
                            position: e.target.value,
                          })
                        }
                        className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                        type="text"
                      />
                    </div>

                    <div className="mt-2 flex">
                      <label className="w-1/5 text-lg opacity-50">
                        Bullets
                      </label>
                      <div className="w-4/5 ml-10 flex flex-col">
                        <input
                          value={activity.bullets}
                          onChange={(e) =>
                            handleEditActivity(index, {
                              ...activity,
                              bullets: e.target.value,
                            })
                          }
                          placeholder="Bullet One, Bullet Two, Bullet Three"
                          className="p-2 rounded-md shadow-lg border-2"
                          type="text"
                        ></input>
                      </div>
                    </div>

                    <div className="mt-2 flex">
                      <label className="w-1/5 text-lg opacity-50">Link</label>
                      <input
                        value={activity.link}
                        onChange={(e) =>
                          handleEditActivity(index, {
                            ...activity,
                            link: e.target.value,
                          })
                        }
                        className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                        type="text"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="my-10">
                <Button onClick={handleAddActivity} type="primary">
                  Add Activity +
                </Button>
              </div>
            </div>

            <hr className="my-10"></hr>
            <div className="mt-10">
              <div className="flex">
                <label className="w-1/5 text-lg opacity-50">Languages</label>
                <div className="w-4/5 ml-10 flex flex-col">
                  {data.resume.languages.map((language, index) => (
                    <div key={index} className="flex">
                      <input
                        value={language}
                        onChange={(e) => {
                          setData({
                            ...data,
                            resume: {
                              ...data.resume,
                              languages: [
                                ...data.resume.languages.slice(0, index),
                                e.target.value,
                                ...data.resume.languages.slice(index + 1),
                              ],
                            },
                          });
                        }}
                        className="w-full p-2 rounded-md shadow-lg border-2"
                        type="text"
                      ></input>
                      <Button
                        onClick={() =>
                          setData({
                            ...data,
                            resume: {
                              ...data.resume,
                              languages: data.resume.languages.filter(
                                (value, i) => index !== i
                              ),
                            },
                          })
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="primary"
                    classes="hover:scale-100"
                    onClick={() =>
                      setData({
                        ...data,
                        resume: {
                          ...data.resume,
                          languages: [...data.resume.languages, "Added"],
                        },
                      })
                    }
                  >
                    Add +
                  </Button>
                </div>
              </div>
              <hr className="my-10"></hr>
              <div className="flex">
                <label className="w-1/5 text-lg opacity-50">
                  Programming Languages
                </label>
                <div className="w-4/5 ml-10 flex flex-col">
                  {data.resume.programming.map((programming, index) => (
                    <div key={index} className="flex">
                      <input
                        value={programming}
                        onChange={(e) => {
                          setData({
                            ...data,
                            resume: {
                              ...data.resume,
                              programming: [
                                ...data.resume.programming.slice(0, index),
                                e.target.value,
                                ...data.resume.programming.slice(index + 1),
                              ],
                            },
                          });
                        }}
                        className="w-full p-2 rounded-md shadow-lg border-2"
                        type="text"
                      ></input>
                      <Button
                        onClick={() =>
                          setData({
                            ...data,
                            resume: {
                              ...data.resume,
                              programming: data.resume.programming.filter(
                                (value, i) => index !== i
                              ),
                            },
                          })
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    onClick={() =>
                      setData({
                        ...data,
                        resume: {
                          ...data.resume,
                          programming: [...data.resume.programming, "Added"],
                        },
                      })
                    }
                    type="primary"
                    classes="hover:scale-100"
                  >
                    Add +
                  </Button>
                </div>
              </div>
              <hr className="my-10"></hr>
              <div className="flex">
                <label className="w-1/5 text-lg opacity-50">
                  Relevant coursework
                </label>
                <div className="w-4/5 ml-10 flex flex-col">
                  {data.resume.coursework.map((coursework, index) => (
                    <div key={index} className="flex">
                      <input
                        value={coursework}
                        onChange={(e) => {
                          setData({
                            ...data,
                            resume: {
                              ...data.resume,
                              coursework: [
                                ...data.resume.coursework.slice(0, index),
                                e.target.value,
                                ...data.resume.coursework.slice(index + 1),
                              ],
                            },
                          });
                        }}
                        className="w-full p-2 rounded-md shadow-lg border-2"
                        type="text"
                      ></input>
                      <Button
                        onClick={() =>
                          setData({
                            ...data,
                            resume: {
                              ...data.resume,
                              coursework: data.resume.coursework.filter(
                                (value, i) => index !== i
                              ),
                            },
                          })
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    onClick={() =>
                      setData({
                        ...data,
                        resume: {
                          ...data.resume,
                          coursework: [...data.resume.coursework, "Added"],
                        },
                      })
                    }
                    type="primary"
                    classes="hover:scale-100"
                  >
                    Add +
                  </Button>
                </div>
              </div>
              <hr className="my-10"></hr>
              <div className="flex">
                <label className="w-1/5 text-lg opacity-50">Technologies</label>
                <div className="w-4/5 ml-10 flex flex-col">
                  {data.resume.technologies.map((technologies, index) => (
                    <div key={index} className="flex">
                      <input
                        value={technologies}
                        onChange={(e) => {
                          setData({
                            ...data,
                            resume: {
                              ...data.resume,
                              technologies: [
                                ...data.resume.technologies.slice(0, index),
                                e.target.value,
                                ...data.resume.technologies.slice(index + 1),
                              ],
                            },
                          });
                        }}
                        className="w-full p-2 rounded-md shadow-lg border-2"
                        type="text"
                      ></input>
                      <Button
                        onClick={() =>
                          setData({
                            ...data,
                            resume: {
                              ...data.resume,
                              technologies: data.resume.technologies.filter(
                                (value, i) => index !== i
                              ),
                            },
                          })
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    onClick={() =>
                      setData({
                        ...data,
                        resume: {
                          ...data.resume,
                          technologies: [...data.resume.technologies, "Added"],
                        },
                      })
                    }
                    type="primary"
                    classes="hover:scale-100"
                  >
                    Add +
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Edit;
