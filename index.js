let allPost = [];


const hideLoadingSpinner = () => {
   return new Promise((resolve) => {
       setTimeout(() => {
           document.getElementById('loading-spinner').style.display = "none";
           resolve();
       }, 2000);
   });
};


const loadAllPosts = async () => {
   document.getElementById('loading-spinner').style.display = "block";
   const response = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts");
   const data = await response.json();
   allPost = data.posts;
   const newsContainer = document.getElementById('news-container');


   data.posts.forEach((item) => {
       const div = document.createElement("div");
       div.classList.add('my-5')
       div.innerHTML = ` <div class="flex flex-col lg:flex-row gap-5 bg-slate-100 lg:h-[270px] lg:w-[772px] w-auto p-7 rounded-3xl">
       <div>
           <img class="lg:h-[72px] lg:w-[100px]  rounded-xl" src="${item.image}" alt="">
       </div>
       <div class="flex flex-col ">
           <div class="flex font-medium text-sm gap-2">
               <p># ${item.category}</p>
               <p>Author : ${item.author.name}</p>
           </div>
           <div>
               <h1 class="font-bold text-xl">${item.title}</h1>
               <p class="text-[#12132D99] my-3">It’s one thing to subject yourself to ha Halloween
                   costume
                   mishap
                   because, hey that’s your prerogative</p>
           </div>


           <hr class="border border-dashed mb-5">
           <div class="flex justify-between">
               <div class="lg:flex lg:flex-row lg:gap-12 flex-col">
                   <div class="flex ">
                       <img src="./images/tabler-icon-message-2.png" alt="">
                       <p class="text-[#12132D99]">${item.comment_count}</p>
                   </div>
                   <div class="flex gap-1">
                       <img src="./images/Group 16.png" alt="">
                       <p class="text-[#12132D99]">${item.view_count}</p>
                   </div>
                   <div class="flex gap-1">
                       <img src="./images/Group 18.png" alt="">
                       <p class="text-[#12132D99] w-full">${item.posted_time} min</p>
                   </div>
               </div>
               <img class="w-7 h-7 " src="./images/Group 40106.png" alt="">
           </div>
       </div>


   </div>`;
       newsContainer.appendChild(div);
   });
   

   await hideLoadingSpinner();
};



const latestNews = async () => {
   const response = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts");
   const data = await response.json();


   const latestNewsCard = document.getElementById('latest-news-card');


   data.forEach((item) => {
       const div = document.createElement("div");
       div.innerHTML = `
       <div class="flex flex-col justify-between my-8 lg:flex-row ">
                   <div class="card lg:w-[474px] bg-base-100 shadow-xl">
                       <figure class="px-3 pt-3">
                           <img src="${item.cover_image}" alt="image"
                               class="rounded-xl" />
                       </figure>
                       <div class="card-body ">
                           <div class="flex gap-1 text-gray-400">
                               <img src="./images/date.png" alt="">
                               <p>${item.author.posted_date || "No publish date"}</p>
                           </div>
                           <div>
                               <h1 class="font-extrabold text-lg">${item.title.slice(0, 30)}</h1>
                           </div>
                           <p class="text-gray-500">${item.description.slice(0, 80)}</p>
                           <div class="flex gap-2">
                               <img class="h-[44px] w-[44px] rounded-full" src="${item.profile_image}" alt="">
                               <div>
                                   <h1 class="font-bold ">${item.author.name}</h1>
                                   <p class ="text-sm text-gray-400">${item.author.designation || "Unknown"}</p>
                               </div>
                           </div>
                       </div>
                   </div>               
               </div>`;
       latestNewsCard.appendChild(div);
   });


};


const handleSearch = () => {
   const value = document.getElementById("search-box").value.toLowerCase();
   const filteredPosts = allPost.filter(item =>
       item.category.toLowerCase().includes(value)
   );


   const newsContainer = document.getElementById('news-container');
   newsContainer.innerHTML = '';
   filteredPosts.forEach((item) => {
       const div = document.createElement("div");
       div.classList.add('my-5')
       div.innerHTML = ` <div class="flex gap-5 bg-slate-100 lg:h-[270px] lg:w-[772px] p-7 rounded-3xl">
       <div>
           <img class="lg:h-[72px] lg:w-[100px] rounded-xl" src="${item.image}" alt="">
       </div>
       <div class="flex flex-col ">
           <div class="flex font-medium text-sm gap-2">
               <p># ${item.category}</p>
               <p>Author : ${item.author.name}</p>
           </div>
           <div>
               <h1 class="font-bold text-xl">${item.title}</h1>
               <p class="text-[#12132D99] my-3">It’s one thing to subject yourself to ha Halloween
                   costume
                   mishap
                   because, hey that’s your prerogative</p>
           </div>


           <hr class="border border-dashed mb-5">
           <div class="flex justify-between">
               <div class="flex gap-12">
                   <div class="flex gap-2">
                       <img src="./images/tabler-icon-message-2.png" alt="">
                       <p class="text-[#12132D99]">${item.comment_count}</p>
                   </div>
                   <div class="flex gap-2">
                       <img src="./images/Group 16.png" alt="">
                       <p class="text-[#12132D99]">${item.view_count}</p>
                   </div>
                   <div class="flex gap-2">
                       <img src="./images/Group 18.png" alt="">
                       <p class="text-[#12132D99] w-full">${item.posted_time}</p>
                   </div>
               </div>
               <img src="./images/Group 40106.png" alt="">
           </div>
       </div>


   </div>`;
       newsContainer.appendChild(div);
   });
}


document.getElementById("search-btn").addEventListener("click", handleSearch);



loadAllPosts();

latestNews();
