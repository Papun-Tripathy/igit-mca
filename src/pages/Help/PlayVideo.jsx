import React from 'react'
import ReactPlayer from 'react-player'

function PlayVideo() {
    return (
        <div>
            url={'https://www.youtube.com/watch?v=ysz5S6PUM-U'}
            config={{
                youtube: {
                    playerVars: { showinfo: 1 }
                }
            }}
        </div>
    )
}

export default PlayVideo