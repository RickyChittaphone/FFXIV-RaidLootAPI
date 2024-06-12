import { ChangeDetectorRef, Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { Player } from '../models/player';
import { Gear } from '../models/gear';
import { HttpService } from '../service/http.service'; // Importing the HttpService
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrl: './player-detail.component.css'
})
export class PlayerDetailComponent {
  JOB : string[] = ["BlackMage", "Summoner", "RedMage", "WhiteMage", "Astrologian", "Sage",
                    "Scholar", "Ninja", "Samurai", "Reaper", "Monk", "Dragoon", "Gunbreaker", "DarkKnight",
                    "Paladin", "Warrior", "Machinist", "Bard", "Dancer", "Pictomancer", "Viper"];
  @Input({required:true}) player! : Player;
  @ViewChild('etroField') etroInputRef: ElementRef;

  constructor(public http: HttpService, private route: ActivatedRoute, public dialog: MatDialog,
              private cdr : ChangeDetectorRef
  ) { } // Constructor with dependency injection

  ChangeTmpEtro(event : Event){
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    this.player.etroBiS = value;
  }
  async onChangeGear(GearType : string, bis : boolean, event: Event){
    const selectElement = event.target as HTMLSelectElement;
    const selectedIndex = selectElement.selectedIndex;
    var NewGear : Gear;
    var GearTypeNumber : number;
    switch (GearType){
      case "Weapon":
        NewGear = this.player.WeaponChoice[selectedIndex];
        GearTypeNumber = 1;
        if(bis)
          this.player.bisWeaponGear = NewGear;
        else
          this.player.curWeaponGear = NewGear;
        break;
      case "Head":
        NewGear = this.player.HeadChoice[selectedIndex];
        GearTypeNumber = 2;
        if(bis)
          this.player.bisHeadGear = NewGear;
        else
          this.player.curHeadGear = NewGear;
        break;
      case "Hands":
        NewGear = this.player.HandsChoice[selectedIndex];
        GearTypeNumber = 4;
        if(bis)
          this.player.bisHandsGear = NewGear;
        else
          this.player.curHandsGear = NewGear;
        break;
      case "Body":
        NewGear = this.player.BodyChoice[selectedIndex];
        GearTypeNumber = 3;
        if(bis)
          this.player.bisBodyGear = NewGear;
        else
          this.player.curBodyGear = NewGear;
        break;
      case "Legs":
        NewGear = this.player.LegsChoice[selectedIndex];
        GearTypeNumber = 5;
        if(bis)
          this.player.bisLegsGear = NewGear;
        else
          this.player.curLegsGear = NewGear;
        break;
      case "Feet":
        NewGear = this.player.FeetChoice[selectedIndex];
        GearTypeNumber = 6;
        if(bis)
          this.player.bisFeetGear = NewGear;
        else
          this.player.curFeetGear = NewGear;
        break;
      case "Necklace":
        NewGear = this.player.NecklaceChoice[selectedIndex];
        GearTypeNumber = 8;
        if(bis)
          this.player.bisNecklaceGear = NewGear;
        else
          this.player.curNecklaceGear = NewGear;
        break;
      case "Earrings":
        NewGear = this.player.EarringsChoice[selectedIndex];
        GearTypeNumber = 7;
        if(bis)
          this.player.bisEarringsGear = NewGear;
        else
          this.player.curEarringsGear = NewGear;
        break;
      case "Bracelets":
        NewGear = this.player.BraceletsChoice[selectedIndex];
        GearTypeNumber = 9;
        if(bis)
          this.player.bisBraceletsGear = NewGear;
        else
          this.player.curBraceletsGear = NewGear;
        break;
      case "RightRing":
        NewGear = this.player.RightRingChoice[selectedIndex];
        GearTypeNumber = 10;
        if(bis)
          this.player.bisRightRingGear = NewGear;
        else
          this.player.curRightRingGear = NewGear;
        break;
      case "LeftRing":
        NewGear = this.player.LeftRingChoice[selectedIndex];
        if(bis)
          this.player.bisLeftRingGear = NewGear;
        else
          this.player.curLeftRingGear = NewGear;
        GearTypeNumber = 11;
        break;
    }
    await this.http.changePlayerGear(this.player.id, GearTypeNumber, NewGear.id, bis).subscribe((data) => {
      console.log(data);
      this.RegetPlayerInfo();
    });
    
    
  }

  getImageSource(gear): string {
    if (gear.gearName == "No Equipment" || (gear === null))
      return 'assets/no_gear.png';
    switch (gear.gearStage) {
      case 'Preparation':
        return 'assets/crafted_gear_icon.png';
      case 'Tomes':
        return 'assets/tomestone_icon.png';
      case 'Raid':
        return 'assets/raid_icon.png';
      case 'Upgraded_Tomes':
          return 'assets/tomestone_icon_upgraded.png';
    }
  }

  EtroDialogOpen(playerId : number){
    const newEtro = this.etroInputRef.nativeElement.value;
    this.dialog.open(EtroDialog, {
      width: '500px',
      height: '500px',
      data: {playerId, newEtro}
    }).afterClosed().subscribe(result => {
      console.log("after closed")
      console.log(result)
      if (result === "Yes"){this.RegetPlayerInfo();}
      
    });
  }

  onChangeName(event : Event){
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    this.http.changePlayerName(this.player.id, value).subscribe((data) => {
      console.log(data);
    });
  }
  onChangeJob(event : Event){
    const selectElement = event.target as HTMLSelectElement;
    const selectedIndex = selectElement.selectedIndex+1;
    this.http.changePlayerJob(this.player.id, selectedIndex).subscribe((data) => {
    });

    // Reset Job dependant values for the player.
    this.http.resetPlayerJobDependantValues(this.player.id).subscribe((data) => {
      console.log(data);
      this.RegetPlayerInfo();
    });

    this.player.staticRef.ConstructStaticPlayerInfo(this.player); // Reloads and recomputes all value

  }

  RecomputePGSWholeStatic(){
      // Recomputing PGS
      this.http.RecomputePGS(this.player.staticRef.uuid).subscribe((data) => {
        console.log(data);
        for(var i = 0; i < data.length; i++){
          this.player.staticRef.players[this.player.staticRef.players.findIndex(player => player.id == this.player.id)].playerGearScore = data[i]["playerGearScoreList"][0]["score"];
        }
      });
  }

  RegetPlayerInfo(){
    this.http.GetSingletonPlayerInfo(this.player.staticRef.uuid, this.player.id).subscribe((data) => {
      console.log(data);
      var newPlayer = Player.CreatePlayerFromDict(data);
      newPlayer.staticRef = this.player.staticRef;
      newPlayer.staticId = this.player.staticId;
      var index = this.player.staticRef.players.findIndex(player => player.id == this.player.id);
      this.player.staticRef.players[index] = newPlayer;
      this.RecomputePGSWholeStatic();
      this.cdr.detectChanges();
    });
  }

}

import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'import-etro',
  templateUrl: './import-etro.component.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class EtroDialog {
  constructor(public dialogRef: MatDialogRef<EtroDialog>,public http: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: { playerId: number; newEtro: string, oldEtro : string },
    private sanitizer: DomSanitizer
  ) {}
  public isLoading = false;
  getSafeUrl(){
  let unsafeUrl = 'https://etro.gg/embed/gearset/' + this.data.newEtro;
  return this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
  }

  ImportEtro(playerId : number, newEtro : string){
    this.isLoading = true;
    this.http.changePlayerEtro(playerId, newEtro).subscribe((data) => {
      console.log(data);
      this.dialogRef.close("Yes");
    });
  }
}
