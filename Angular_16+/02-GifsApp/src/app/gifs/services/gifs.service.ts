import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, GIFResponseType } from '../interfaces/gifs.interfaces';
import { getFromLocalStorage, saveToLocalStorage } from '../../../utils/localStorage';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  /**
   * Declare private to avoid external mutations
   * of the array.
   */
  private _tagsHistory: string[] = [];

  /**
   * Declare public to access from an external component
   */
  public gifsList: Gif[] = [];

  private _apiKey: string = "0k9KQKoH8wiEPn2ak09veulSWSgooDru";
  private _apiBaseUrl: string = "https://api.giphy.com/v1/gifs";
  private _gifsLimit: number = 10;

  constructor( private http: HttpClient ) {
    this.loadLocalStorage();
  }

  /**
   * to access to the private data
   * we use a getter function.
   * 
   * returning a copy of the array
   */
  get tagHistory() {
    return [...this._tagsHistory];
  }

  // private method to not use outside this service
  private organizeHistory(tag: string) {
    // convert to lowercase to make simple
    tag = tag.toLowerCase();

    // if there is a duplicate at the array
    if (this._tagsHistory.includes( tag )) {
      // update array with a filtered copy without the tag
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag );
    }

    /** adding a new tag to the history at 
    *   the start of the array
    */
    this._tagsHistory.unshift( tag );

    this._tagsHistory = this._tagsHistory.splice(0, 10);

    saveToLocalStorage(JSON.stringify(this._tagsHistory), 'history');
  }

  private loadLocalStorage() {
    const localStorageContent = getFromLocalStorage('history');

    if (!localStorageContent) return;

    this._tagsHistory = JSON.parse(localStorageContent)!;

    if (this._tagsHistory.length === 0) return;

    this.searchTag(this._tagsHistory[0]);
  }

  public async searchTag( tag: string ): Promise<void> {
    // if tag is empty string do not do anything
    if ( tag.length ===0 ) return;

    this.organizeHistory( tag );

    const params = new HttpParams()
    .set('api_key', this._apiKey)
    .set('q', tag)
    .set('limit', this._gifsLimit)

    this.http.get<GIFResponseType>(`${this._apiBaseUrl}/search`, { params })
    .subscribe( (response: GIFResponseType) => {
      this.gifsList = response.data;
    });

  }
}
