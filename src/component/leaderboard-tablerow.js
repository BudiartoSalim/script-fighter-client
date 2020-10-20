import React from 'react'
 
function LeaderboardRow (props) {

  const { user , idx } = props
   console.log(props)
  return (
    <tr>
        <td>Rank {idx + 1} - User : {user.User.username.toUpperCase()}</td>
        <td>{user.collectedExp}</td>
    </tr>
  )
}

export default LeaderboardRow