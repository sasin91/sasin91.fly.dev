<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ContactRequestResource\Pages;
use App\Models\ContactRequest;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;

class ContactRequestResource extends Resource
{
    protected static ?string $model = ContactRequest::class;

    protected static ?string $navigationIcon = 'heroicon-o-collection';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('contactPerson'),
                TextInput::make('companyName'),
                TextInput::make('email'),
                TextInput::make('phone'),
                TextInput::make('message'),
            ]);
    }

    public static function table(Tables\Table $table): Tables\Table
    {
        return $table
            ->columns([
                TextColumn::make('contactPerson')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('companyName'),
                TextColumn::make('email'),
                TextColumn::make('phone'),
                TextColumn::make('message'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListContactRequests::route('/'),
            'create' => Pages\CreateContactRequest::route('/create'),
            'edit' => Pages\EditContactRequest::route('/{record}/edit'),
        ];
    }
}
