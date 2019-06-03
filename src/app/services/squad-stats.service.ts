import { Injectable } from '@angular/core';
import { SquadStats } from '../models/squad/squad-stats';
import { Squad } from '../models/squad/squad';
import { Card } from '../models/card/card';

@Injectable({
    providedIn: "root"
})
export class SquadStatsService {
    calculate(squad: Squad, cards: { [position: string]: Card }): SquadStats {
        var occupiedPositions = Object.keys(squad.lineup).filter(pos => squad.lineup[pos]);

        if (occupiedPositions.length === 0) return;

        var stats = new SquadStats();
        stats.rating = occupiedPositions.map<number>(c => cards[c].rating).reduce((sum, current) => sum + current) / Object.keys(squad.lineup).length;
        stats.chemistry = (occupiedPositions.length / Object.keys(squad.lineup).length) * 100;
        stats.fitness = occupiedPositions.map<number>(c => cards[c].fitness).reduce((sum, current) => sum + current) / occupiedPositions.length;

        return stats;
    }
}