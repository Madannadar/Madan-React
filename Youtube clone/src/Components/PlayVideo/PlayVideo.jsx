import React from 'react'
import './PlayVideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'


const PlayVideo = () => {
  return (
    <div className='play-video'>
        <video src={video1} controls autoPlay muted></video>
        <h3>Best youtube video made by you father gandu</h3>
        <div className="play-video-info">
            <p>1234 views &bull; 2 days ago </p> 
            {/* &bull; is for dot  */}
            <div>
                <span><img src={like}alt="" />125</span>
                <span><img src={dislike}alt="" />2</span>
                <span><img src={share}alt="" />Share</span>
                <span><img src={save}alt="" />Save</span>
            </div>
            <div className="publisher">
                <img src={jack} alt="" />
                <div>
                    <p>Madan ka channel</p>
                    <span>1M Subscribers</span>
                </div>
                <button>Subscribers</button>
            </div>
            <div className="vid-description">
                <p>Channel that dose not have anything</p>
                <p>Subsjfsdfdsfdsfdlskfjdlsa</p>
                <hr />
                <h4>999 Comments</h4>
                <div className="comments">
                    <img src={user_profile} alt="" />
                    <div>
                        <h3>My wife <span>2 day ago</span></h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique temporibus optio numquam nobis atque alias autem laboriosam eaque eum placeat.</p>
                        <div className="comment-action">
                            <img src={like} alt="" />
                            <span>244</span>
                            <img src={dislike} alt="" />
                        </div>
                    </div>
                </div>
                <div className="comments">
                    <img src={user_profile} alt="" />
                    <div>
                        <h3>My wife <span>2 day ago</span></h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique temporibus optio numquam nobis atque alias autem laboriosam eaque eum placeat.</p>
                        <div className="comment-action">
                            <img src={like} alt="" />
                            <span>244</span>
                            <img src={dislike} alt="" />
                        </div>
                    </div>
                </div>
                <div className="comments">
                    <img src={user_profile} alt="" />
                    <div>
                        <h3>My wife <span>2 day ago</span></h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique temporibus optio numquam nobis atque alias autem laboriosam eaque eum placeat.</p>
                        <div className="comment-action">
                            <img src={like} alt="" />
                            <span>244</span>
                            <img src={dislike} alt="" />
                        </div>
                    </div>
                </div>
                <div className="comments">
                    <img src={user_profile} alt="" />
                    <div>
                        <h3>My wife <span>2 day ago</span></h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique temporibus optio numquam nobis atque alias autem laboriosam eaque eum placeat.</p>
                        <div className="comment-action">
                            <img src={like} alt="" />
                            <span>244</span>
                            <img src={dislike} alt="" />
                        </div>
                    </div>
                </div>
                <div className="comments">
                    <img src={user_profile} alt="" />
                    <div>
                        <h3>My wife <span>2 day ago</span></h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique temporibus optio numquam nobis atque alias autem laboriosam eaque eum placeat.</p>
                        <div className="comment-action">
                            <img src={like} alt="" />
                            <span>244</span>
                            <img src={dislike} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PlayVideo