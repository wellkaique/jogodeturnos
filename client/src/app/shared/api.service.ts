import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from './models/player.model';


@Injectable({ providedIn: 'root' })
export class ApiService {
base = 'http://localhost:3000/api';
constructor(private http: HttpClient) {}


getRanking(): Observable<Player[]> {
return this.http.get<Player[]>(`${this.base}/ranking`);
}


postRanking(player: Player) {
return this.http.post<Player>(`${this.base}/ranking`, player);
}
}