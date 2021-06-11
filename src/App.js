import "bulma/css/bulma.css";
import './App.css';
import { useState, useEffect } from 'react';
import * as api from './api'
import OptionSelector from './OptionSelector';

function App() {

  const [participants, setParticipants] = useState(null)
  const [users, setUsers] = useState(null)

  const [selectedParticipantType, setSelectedParticipantType] = useState(null)

  useEffect(() => {
    function loadParticipantsData() {
      return api.getParticipants();
    }

    async function onLoad() {
      try {
        const participantsResponse = await loadParticipantsData();
        setParticipants(participantsResponse.data.Items)

        const usersResponse = await api.slackApi('users.list');
        const resultedUsers = [...usersResponse.data.members].sort(function(a, b) {
          var textA = a.name.toUpperCase();
          var textB = b.name.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        })
        setUsers(resultedUsers);
      } catch (e) {
        console.error(e)
        // onError(e);
      }
    }
    onLoad();
  }, []);

  if (participants === null) return 'Loading....';
  if (users === null) return 'Loading....';

  const filteredParticipants = participants.filter(participant => {

    if (selectedParticipantType === null) {
      return true
    }
    return participant.sk.split("__")[0] === selectedParticipantType;
  })

  return (
    <div class="container is-max-desktop">
      <br />
      <br />

      <h1 class="title ">WFAnywhere Hackathon</h1>
      <OptionSelector
        preText=""
        afterText=""
        size='is-large'
        options={["solo-participant", "idea-author"]}
        value={selectedParticipantType}
        onChange={setSelectedParticipantType}
      />

        <div className="columns is-2 is-multiline  is-mobile">
          {filteredParticipants.map(participant => ( <Participant
                key={participant.sk}
                slackUser={users.find(user => user.id === participant.sk.split("__")[1])}
                participant={participant}
              />
            )
          )}
        </div>
    </div>
  )
}

function Participant ({participant, slackUser}) {

  if (slackUser === undefined) return 'Loading...'

  const participantType = participant.sk.split("__")[0]



  return (
<div className="column is-flex is-half">
  <div class="card" style={{width: '100%'}}>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-96x96">
            <img src={slackUser.profile.image_192} alt="Placeholder image" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{slackUser.real_name}</p>
          <p class="subtitle is-6">@{slackUser.name}</p>
        </div>
      </div>

      {participant.ideaDescription && (
        <div class="content">
          {participant.ideaDescription}
          <br />
          {/* <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time> */}
        </div>
      ) }

      {participant.experience && (
        <div class="content">
          {participant.experience}
          <br />
          {/* <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time> */}
        </div>
      ) }

      {participant.skills.map(skill => (
        <span class="tag is-light" style={{margin: '0.3rem'}}>{skill}</span>
      ))}

    </div>
  </div>
</div>
  )

  return (
    <div className="column is-one-third">
      <b></b>
      <div>{participantType}</div>
    </div>
  )
}

export default App;
