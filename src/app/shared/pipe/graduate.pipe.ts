import { Pipe, PipeTransform } from '@angular/core';

// 自定义管道 getGraduate
@Pipe({
  name: 'getGraduate',
})

// 创建的管道的类
export class GraduatePipe implements PipeTransform {
  transform(value: string) {
    return value ? '是' : '否';
  }
}
