const input = document.querySelector('input')
const btn = document.getElementById('searc')
const contain = document.querySelector('.contain')
const repo_container = document.querySelector('.repos')



async function user(username){
    const resp = await fetch(`https://api.github.com/users/${username}`)
    const data = await resp.json()
    console.log(data)
    return data;
}

user('ivy')



async function repos(username){
    const resp = await fetch(`https://api.github.com/users/${username}/repos`)
    const data = await resp.json()
    return data;
}

async function add_repo(){
    const reposData = await repos(input.value);
    repo_container.innerHTML = reposData.map(repo => {
        return `

        <div class="mini">
            
            <li>${repo.name}</li>
        </div>
        
        `
    }).join('')
}




btn.addEventListener('click', async ()=> {
    const input_val = input.value;
    const result = await user(input_val);
    add_repo()

    let result_bio = result.bio == null ? 'none': 'block';
    

    
    

    if(!result.login){
        alert('No user found!')
    }else{
        
        contain.innerHTML = `

        <div class="card">
            
            <img src="${result.avatar_url}" alt="" class="img">

            
            
            <div class="profile">

                <span class="span">${result.name}</span>

                <span class="pan">@${result.login}</span>
                <span class="pan"><img src="icons8-user-location-64.png" alt="" class="max">${result.location}</span>
                <span class="pan"><img src="./twitter-24.png" alt="" class="max">${result.twitter_username}</span>
                
            </div>
            <button class="btn" ><a href=${result.html_url}target="_blank" >Visit profile</a></button>
        </div>

        <div class="about" style={display : ${result_bio}}>
            <span  class ="span">About</span>
            <span>${result.bio}</span>
        </div>

        <div class="follow">

        <div>
            <div>
                <span class="span">Followers</span>
                <div class="dic">
                    <span>${result.followers}</span>
                </div>
            </div>
        </div>

        <div>
            <span class="span">Following</span>
            <div class="dic">
                <span>${result.following}</span>
            </div>
        </div>

        <div>
            <span class="span">Repos</span>
            <div class="dic">
                <span>${result.public_repos}</span>
            </div>
        </div>

        </div>

        
        
        
        `
    }
})