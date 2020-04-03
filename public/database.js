class LocationData {
  constructor() {
    this.data = null;
    this.loaded = false;
    this.getData();
  }
  
  async getData () {
    const response = await fetch('/api');
    this.data = await response.json();
  }

  showDataManager () {
    if(this.loaded == false){
      this.makeTable();
    } else {
      console.log("Data is already loaded.")
    }
  }

  makeTable () {
    this.data.forEach(element => {     
      // show headers
      document.getElementById('db-table').style.display = "table";

      //create elements
      let tr = document.createElement('tr');
      let th = document.createElement('th');

      let start_coords = document.createElement('td')
      let start_temp = document.createElement('td');
      let end_coords = document.createElement('td')
      let end_temp = document.createElement('td');

      //enrich elements
      const dateString = new Date(element.createdAt).toLocaleString();
      th.textContent = dateString
      th.setAttribute("scope", "row");
      start_coords.textContent = `${element.start_lat},${element.start_lon}`
      start_temp.textContent = element.start_temp;
      end_coords.textContent = `${element.end_lat},${element.end_lon}`
      end_temp.textContent = element.end_temp;

      //build html
      document.getElementById('db-table-body').appendChild(tr);
      tr.appendChild(th);
      tr.appendChild(start_coords);
      tr.appendChild(start_temp);
      tr.appendChild(end_coords);
      tr.appendChild(end_temp);
    });
    this.loaded = true;
  }
}

locationData = new LocationData();