import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'orderBy', pure: false })
export class OrderBy implements PipeTransform {

    transform(array: any[], field: string): any[] {
        if (array === undefined) return array;

        array.sort((a: any, b: any) => {
            if (typeof a[field] == 'string') {
                if (a[field] < b[field]) {
                    return -1;
                } else if (a[field] > b[field]) {
                    return 1;
                } else {
                    return 0;
                }
            } else if (typeof a[field] == 'number') {
                return a[field] - b[field];
            } else {
                return 0;
            }
        });
        return array;
    }
}