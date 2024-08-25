import { passwordStrength, type Options } from 'check-password-strength';

export default function (pass: string) {
    const options: Options<string> = [
        {
            id: 0,
            value: "Immédiatement",
            minDiversity: 0,
            minLength: 0
        },
        {
            id: 1,
            value: "45 secondes",
            minDiversity: 1,
            minLength: 12
        },
        {
            id: 2,
            value: "41 minutes",
            minDiversity: 1,
            minLength: 14
        },
        {
            id: 3,
            value: "22 minutes",
            minDiversity: 2,
            minLength: 8
        },
        {
            id: 4,
            value: "1 mois",
            minDiversity: 2,
            minLength: 10
        },
        {
            id: 5,
            value: "300 ans",
            minDiversity: 2,
            minLength: 12
        },
        {
            id: 6,
            value: "800 000 ans",
            minDiversity: 2,
            minLength: 14
        },
        {
            id: 7,
            value: "1 seconde",
            minDiversity: 3,
            minLength: 6
        },
        {
            id: 8,
            value: "1 heure",
            minDiversity: 3,
            minLength: 8
        },
        {
            id: 9,
            value: "7 mois",
            minDiversity: 3,
            minLength: 10
        },
        {
            id: 10,
            value: "2000 ans",
            minDiversity: 3,
            minLength: 12
        },
        {
            id: 11,
            value: "9 millions d'années",
            minDiversity: 3,
            minLength: 14
        },
        {
            id: 12,
            value: "5 secondes",
            minDiversity: 4,
            minLength: 6
        },
        {
            id: 13,
            value: "9 heures",
            minDiversity: 4,
            minLength: 8
        },
        {
            id: 14,
            value: "5 ans",
            minDiversity: 4,
            minLength: 10
        },
        {
            id: 15,
            value: "34000 ans",
            minDiversity: 4,
            minLength: 12
        },
        {
            id: 16,
            value: "200 millions d'années",
            minDiversity: 4,
            minLength: 14
        },
    ];


    return passwordStrength(pass, options);
}