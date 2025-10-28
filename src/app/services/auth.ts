import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  
  
  
private firebaseApp = initializeApp(environment.firebaseConfig);
  private auth = getAuth(this.firebaseApp);

  constructor(private firestore: Firestore) {}

  /**
   * Connexion avec email et mot de passe
   */
  async login(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * Inscription avec email et mot de passe
   * + Enregistrement des infos dans Firestore
   */
  async signUp(email: string, password: string, userData: any): Promise<void> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);

    // Enregistrer les infos utilisateur dans Firestore
    await addDoc(collection(this.firestore, 'users'), {
      uid: userCredential.user.uid,
      nom: userData.nom,
      prenom: userData.prenom,
      genre: userData.genre,
      email: userData.email,
      role: userData.role,
      createdAt: new Date()
    });
  }

  /**
   * Envoi d'un email de réinitialisation du mot de passe
   */
  async resetPassword(email: string): Promise<void> {
    return await sendPasswordResetEmail(this.auth, email);
  }

  /**
   * Déconnexion de l'utilisateur
   */
  async logout(): Promise<void> {
    return await signOut(this.auth);
  }

  /**
   * Récupérer l'utilisateur connecté
   */
  get currentUser() {
    return this.auth.currentUser;
  }
}
