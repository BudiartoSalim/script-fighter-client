import React from 'react'
 
function LeaderboardRow (props) {

  const { user , idx } = props
   console.log(props)
  return (
    <tr>
        <td style={{width:'30px'}}>{idx + 1}</td>
        <td>{user.User.username.toUpperCase()}</td>
        <td>{user.collectedExp}</td>
    </tr>
  )
}

export default LeaderboardRow