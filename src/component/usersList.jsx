import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import Button from "react-bootstrap/esm/Button"
import { FormattedMessage } from "react-intl"
import { mainState } from "../mobx/mainState"


const UsersList = observer((props) => {
  useEffect(()=> {
    mainState.getUser()
  },[])


  return (
    <div>
      <div><FormattedMessage id="usersLink"/></div>
      <div>{mainState.fetching ? <div>Загрузка...</div> : ""}
        {mainState.showUsers 
        ? mainState.users.map(u => <div key={u.id}>
          <div><span className="userId">{u.id}</span> {u.name} {u.email}</div>
          <div></div>
        </div>) 
        : <div>
          <Button onClick={() => {
          
          mainState.setShowUsers(true)
        }}><FormattedMessage id="downloadUsers"/></Button>
        </div>}
      </div>
      
        
      
    </div>
  )
})

export default UsersList