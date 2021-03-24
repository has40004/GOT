export default class GotService {
    _apiBase = 'https://www.anapioficeandfire.com/api';
    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok){
            throw new Error(`Could not fetch ${url}`);
        }
        return await res.json();

    }

     getAllCharacters = async () => {
        const res = await this.getResource('/characters?page=57&pageSize=10');
        return res.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}/`);
        return this._transformCharacter(character);
    }
    
     getAllHouses = async () => {
        const houses = await  this.getResource('/houses/');
        return houses.map(this._transformHouses)
    }

    getHouse = async(id) => {
        const house = await this.getResource(`/houses/${id}/`);
        return this._transformHouses(house);
    }

    getAllBooks =async () => {
        const books = await this.getResource('/books/');
        return books.map(this._transformBooks)
    }

    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}/`);
        return this._transformBooks(book);
    }

    noData = (item ) =>  {
        if (item ) {
            return item
        }else if (!item ||  item === ''){
            return 'no data' 
        }
        
    } 


    _extractId = (item) => {
        const idRegExp = /([0-9]*)$/;
        const items = item.match(idRegExp)[1];
        return items
      };


    _transformCharacter = (char) => {
        return {
            name : this.noData(char.name),
            gender: this.noData(char.gender),
            born: this.noData(char.born),
            died : this.noData(char.died),
            culture : this.noData(char.culture),
            id : this._extractId(char.url)
           
        }
    }

    _transformHouses = (house) => {
        
        return {
            name : house.name,
            region : this.noData(house.region),
            words : this.noData(house.words),
            titles : this.noData(house.titles),
            coatOfArms : this.noData(house.coatOfArms),
            overlord : this.noData (house.overlord),
            heir : this.noData ( this._extractId(house.heir)),
            id : this._extractId(house.url)
        }
    }
    _transformBooks = (book) => {
        return {
            name : this.noData(book.name),
            numberOfPages : this.noData(book.numberOfPages),
            publisher : this.noData(book.publisher),
            released : this.noData(book.released),
            id : this._extractId(book.url)
        }
    }

}

// const hasan = new GotService()
// hasan.getAllCharacters()
// .then((house) => console.log(house))




// // hasan._extractId('https://www.anapioficeandfire.com/api/characters/122/')
// // .then((item) => {
// //     console.log(item);
// // })
// const names = hasan.getCharacter(477)
// .then((item) => item).then(item => item.name)

// console.log(names);
